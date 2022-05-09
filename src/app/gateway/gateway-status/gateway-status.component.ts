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

    this.organisationChangeSubject.subscribe((orgId) => {
      if (orgId) {
        this.organizationId = orgId;
        this.isDirty = true;
      }
    });

    this.isVisibleSubject.pipe().subscribe(() => {
      if (!this.isDirty) {
        return;
      }

      this.isDirty = false;
      this.subscribeToGetGatewayStatus();
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

  private subscribeToGetGatewayStatus(
    organizationId = this.organizationId,
    timeInterval = this.selectedStatusInterval
  ): void {
    this.isLoadingResults = true;
    this.gatewayStatusSubscription = this.getGatewayStatus(
      organizationId,
      timeInterval
    ).subscribe((response) => {
      this.isLoadingResults = false;
      this.handleStatusResponse(response);
    });
  }

  private handleStatusResponse(response: GatewayStatusResponse) {
    this.resultsLength = response.count;
    const sortedData = response.data
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
      gateway.onlineTimestamps.forEach((timestamp) => {
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
      for (
        const dt = new Date(minDate);
        dt <= new Date(maxDate);
        dt.setTime(dt.getTime() + 1000 * (60 * 60 * 1))
      ) {
        this.timeColumns.push(dt.toISOString());
      }
    }

    this.displayedColumns = [this.columnGatewayName].concat(this.timeColumns);
  }

  private clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  getStatusClass(gateway: GatewayStatus, timestamp: string) {
    return !gateway.onlineTimestamps.length
      ? 'never-seen'
      : gateway.onlineTimestamps.some((gatewayTimestamp) =>
          moment(gatewayTimestamp).isSame(moment(timestamp), 'hour')
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
      this.subscribeToGetGatewayStatus(this.organizationId, newInterval);
    }
  }

  formatFooterDate(timestamp: string): string {
    return moment(timestamp).format('DD-MM');
  }

  formatTime(timestamp: string): string {
    return moment(timestamp).format('HH:00');
  }

  formatTooltip(gateway: GatewayStatus, timestamp: string): string {
    const formattedTime = !gateway.onlineTimestamps.length
      ? this.neverSeenText
      : moment(timestamp).format('DD-MM-YYYY HH:00');
    return `${this.nameText}: ${gateway.name}\n${this.timestampText}: ${formattedTime}`;
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.gatewayStatusSubscription?.unsubscribe();
  }
}
