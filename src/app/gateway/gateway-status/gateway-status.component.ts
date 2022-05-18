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
import * as moment from 'moment';
import { Observable, Subject, Subscription } from 'rxjs';
import { GatewayStatusInterval } from '../enums/gateway-status-interval.enum';
import { GatewayStatus, AllGatewayStatusResponse } from '../gateway.model';
import { map } from 'rxjs/operators';

interface TimeColumn {
  exactTimestamp: string;
  tooltip: string;
  datePart: string;
  timePart: string;
}

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
  @Input() gatewayId: string;
  @Input() shouldLinkToDetails = true;

  private gatewayStatusSubscription: Subscription;
  private readonly columnGatewayName = 'gatewayName';
  dataSource: MatTableDataSource<GatewayStatus>;
  /**
   * List of pre-processed timestamps for performance
   */
  timeColumns: TimeColumn[] = [];
  displayedColumns: (TimeColumn | string)[] = [];
  nameText = '';
  neverSeenText = '';
  timestampText = '';
  visibleFooterTimeInterval = 1;
  pageSize = environment.tablePageSize;
  resultsLength = 0;
  organizationId: number | undefined;
  isLoadingResults = false;
  isDirty = true;
  statusIntervals: GatewayStatusInterval[];
  selectedStatusInterval = GatewayStatusInterval.DAY;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private translate: TranslateService,
    private lorawanGatewayService: LoRaWANGatewayService
  ) {}

  ngAfterContentInit(): void {
    this.translate
      .get(['GEN.NAME', 'GEN.NEVER-SEEN', 'LORA-GATEWAY-STATUS.TIMESTAMP'])
      .subscribe((translations) => {
        this.nameText = translations['GEN.NAME'];
        this.neverSeenText = translations['GEN.NEVER-SEEN'];
        this.timestampText = translations['LORA-GATEWAY-STATUS.TIMESTAMP'];
      });

    this.organisationChangeSubject?.subscribe((orgId) => {
      if (this.organizationId !== orgId) {
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
  ): Observable<AllGatewayStatusResponse> {
    const params: Record<string, string | number> = {
      timeInterval,
      // Paginator is only avaiable in ngAfterViewInit
      limit: this.paginator?.pageSize,
      offset: this.paginator?.pageIndex * this.paginator.pageSize,
    };

    if (organizationId) {
      params.organizationId = organizationId;
    }

    return !this.gatewayId
      ? this.lorawanGatewayService.getAllStatus(params)
      : this.lorawanGatewayService
          .getStatus(this.gatewayId, { timeInterval })
          .pipe(
            map(
              (response) =>
                ({ data: [response], count: 1 } as AllGatewayStatusResponse)
            )
          );
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

  private handleStatusResponse(response: AllGatewayStatusResponse) {
    this.resultsLength = response.count;
    const gatewaysWithLatestTimestampsPerHour = this.takeLatestTimestampInHour(
      response.data
    );
    const gatewaysWithWholeHourTimestamps = this.toWholeHour(
      gatewaysWithLatestTimestampsPerHour
    );

    const sortedData = gatewaysWithWholeHourTimestamps
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
        this.timeColumns.push({
          exactTimestamp: currDate.toISOString(),
          tooltip: currDate.format('DD-MM-YYYY HH:00'),
          datePart: currDate.format('DD-MM'),
          timePart: currDate.format('HH:00'),
        });
      } while (currDate.add(1, 'hour').startOf('hour').diff(lastDate) <= 0);
    }

    this.displayedColumns = [
      this.columnGatewayName,
      ...this.timeColumns.map((column) => column.exactTimestamp),
    ];
  }

  private toWholeHour(data: GatewayStatus[]): typeof data {
    return data.map((gateway) => ({
      ...gateway,
      statusTimestamps: gateway.statusTimestamps.map((status) => ({
        ...status,
        timestamp: moment(status.timestamp).startOf('hour').toDate(),
      })),
    }));
  }

  /**
   * The most recent status per time period takes priority. The data can contain multiple data points
   * per time period. This method processeses the data and keeps the latest data point per time period.
   *
   * @param data A list of gateway status'
   */
  private takeLatestTimestampInHour(data: GatewayStatus[]): typeof data {
    return data.map((gateway) => {
      const timestamps = gateway.statusTimestamps.reduce(
        (res: typeof gateway.statusTimestamps, currentStatus) => {
          // Check if we already passed a timestamp in the same hour slot as the current one and if it's older
          const currentTimestamp = moment(currentStatus.timestamp);
          const sameHourTimestampIndex = res.findIndex((storedStatus) => {
            const storedTimestamp = moment(storedStatus.timestamp);
            return storedTimestamp.isSame(currentTimestamp, 'hour');
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

  onSelectInterval({
    isUserInput,
    source: { value: newInterval },
  }: MatOptionSelectionChange) {
    if (
      isUserInput &&
      newInterval !== this.selectedStatusInterval &&
      !this.isLoadingResults
    ) {
      this.subscribeToGetAllGatewayStatus(this.organizationId, newInterval);
    }
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.gatewayStatusSubscription?.unsubscribe();
  }
}
