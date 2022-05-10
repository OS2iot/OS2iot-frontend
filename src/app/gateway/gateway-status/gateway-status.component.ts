import {
  AfterContentInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { recordToEntries } from '@shared/helpers/record.helper';
import { LoRaWANGatewayService } from '@shared/services/lorawan-gateway.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { GatewayStatusInterval } from '../enums/gateway-status-interval.enum';
import { GatewayStatus, GatewayStatusResponse } from '../gateway.model';

@Component({
  selector: 'app-gateway-status',
  templateUrl: './gateway-status.component.html',
  styleUrls: ['./gateway-status.component.scss'],
})
export class GatewayStatusComponent implements AfterContentInit, OnDestroy {
  @Input() organisationChangeSubject: Subject<number>;
  @Input() isVisibleSubject: Subject<void>;
  @Input() paginatorClass: string;
  @Input() title: string;

  private gatewayStatusSubscription: Subscription;
  private readonly columnGatewayName = 'gatewayName';
  dataSource: MatTableDataSource<GatewayStatus>;
  timeColumns: string[] = [];
  displayedColumns: string[] = [];
  nameText = '';
  neverSeenText = '';
  timestampText = '';
  visibleFooterTimeInterval = 1;
  pageSize = environment.tablePageSize;
  resultsLength = 0;
  organizationId: number;
  isLoadingResults = false;
  isDirty = true;
  statusIntervals: GatewayStatusInterval[];
  selectedStatusInterval = GatewayStatusInterval.DAY;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private translate: TranslateService,
    private sharedVariableService: SharedVariableService,
    private lorawanGatewayService: LoRaWANGatewayService
  ) {}

  ngAfterContentInit(): void {
    this.organizationId = this.sharedVariableService.getSelectedOrganisationId();

    this.translate
      .get(['GEN.NAME', 'GEN.NEVER-SEEN', 'LORA-GATEWAY-STATUS.TIMESTAMP'])
      .subscribe((translations) => {
        this.nameText = translations['GEN.NAME'];
        this.neverSeenText = translations['GEN.NEVER-SEEN'];
        this.timestampText = translations['LORA-GATEWAY-STATUS.TIMESTAMP'];
      });

    this.organisationChangeSubject?.subscribe((orgId) => {
      if (orgId && this.organizationId !== orgId) {
        this.organizationId = orgId;
        this.isDirty = true;
      }
    });

    this.isVisibleSubject?.pipe().subscribe(() => {
      if (!this.isDirty) {
        return;
      }

      this.isDirty = false;
      this.subscribeToGetAllGatewayStatus();
    });

    this.statusIntervals = recordToEntries(GatewayStatusInterval).map(
      (interval) => interval.value
    );
  }

  private getGatewayStatus(
    organizationId = this.organizationId,
    timeInterval = this.selectedStatusInterval
  ): Observable<GatewayStatusResponse> {
    return this.lorawanGatewayService.getAllStatus({
      organizationId,
      timeInterval,
      // Paginator is only avaiable in ngAfterViewInit
      limit: this.paginator?.pageSize,
      offset: this.paginator?.pageIndex * this.paginator.pageSize,
    });
  }

  private subscribeToGetAllGatewayStatus(
    organizationId = this.organizationId,
    timeInterval = this.selectedStatusInterval
  ): void {
    this.isLoadingResults = true;
    this.paginator.pageIndex = 0;
    this.gatewayStatusSubscription = this.getGatewayStatus(
      organizationId,
      timeInterval
    ).subscribe((response) => {
      this.isLoadingResults = false;

      if (response) {
        this.handleStatusResponse(response);
      }
    });
  }

  private handleStatusResponse(response: GatewayStatusResponse) {
    this.resultsLength = response.count;
    const filteredData = this.takeLatestTimestampInHour(response.data);

    const sortedData = filteredData
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

    this.buildColumns(sortedData);
    this.visibleFooterTimeInterval = Math.round(
      this.clamp(this.timeColumns.length / 4, 1, 6)
    );

    this.dataSource = new MatTableDataSource<GatewayStatus>(sortedData);
    this.dataSource.paginator = this.paginator;
  }

  private buildColumns(response: GatewayStatus[]) {
    let minDate: Date | null | undefined;
    let maxDate: Date | null | undefined;
    this.timeColumns = [];

    response.forEach((gateway) => {
      gateway.statusTimestamps.forEach(({ timestamp }) => {
        if (!minDate) {
          minDate = timestamp;
        }
        if (!maxDate) {
          maxDate = timestamp;
        }

        if (timestamp < minDate) {
          minDate = timestamp;
        } else if (timestamp > maxDate) {
          maxDate = timestamp;
        }
      });
    });

    if (minDate && maxDate) {
      const currDate = moment(minDate).startOf('hour');
      const lastDate = moment(maxDate).startOf('hour');

      do {
        this.timeColumns.push(currDate.toISOString());
      } while (currDate.add(1, 'hour').startOf('hour').diff(lastDate) <= 0);
    }

    this.displayedColumns = [this.columnGatewayName].concat(this.timeColumns);
  }

  private takeLatestTimestampInHour(data: GatewayStatus[]): typeof data {
    return data.map((gateway) => {
      const timestamps = gateway.statusTimestamps.reduce(
        (res: typeof gateway.statusTimestamps, currentStatus) => {
          // Check if we already passed a timestamp in the same hour slot as the current one and if it's older
          const sameHourTimestampIndex = res.findIndex((storedStatus) => {
            const storedTimestamp = moment(storedStatus.timestamp);
            return storedTimestamp.isSame(currentStatus.timestamp, 'hour');
          });

          if (sameHourTimestampIndex >= 0) {
            // Only keep the latest timestamp in the same slot
            if (
              res[sameHourTimestampIndex].timestamp < currentStatus.timestamp
            ) {
              res.splice(sameHourTimestampIndex, 1);
            } else {
              // Don't store the current timestamp as it's older than the stored one
              return res;
            }
          }

          res.push(currentStatus);
          return res;
        },
        []
      );

      return {
        ...gateway,
        statusTimestamps: timestamps,
      };
    });
  }

  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  getStatusClass(gateway: GatewayStatus, timestamp: string) {
    return !gateway.statusTimestamps.length
      ? 'never-seen'
      : gateway.statusTimestamps.some(
          (gatewayTimestamp) =>
            moment(gatewayTimestamp.timestamp).isSame(
              moment(timestamp),
              'hour'
            ) && gatewayTimestamp.wasOnline
        )
      ? 'online'
      : 'offline';
  }

  onSelectInterval({
    isUserInput,
    source: { value: newInterval },
  }: MatOptionSelectionChange) {
    if (
      isUserInput &&
      newInterval !== this.selectedStatusInterval &&
      this.dataSource?.data.length
    ) {
      this.subscribeToGetAllGatewayStatus(this.organizationId, newInterval);
    }
  }

  formatFooterDate(timestamp: string): string {
    return moment(timestamp).format('DD-MM');
  }

  formatTime(timestamp: string): string {
    return moment(timestamp).format('HH:00');
  }

  formatTooltip(gateway: GatewayStatus, timestamp: string): string {
    const formattedTime = !gateway.statusTimestamps.length
      ? this.neverSeenText
      : moment(timestamp).format('DD-MM-YYYY HH:00');
    return `${this.nameText}: ${gateway.name}\n${this.timestampText}: ${formattedTime}`;
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.gatewayStatusSubscription?.unsubscribe();
  }
}
