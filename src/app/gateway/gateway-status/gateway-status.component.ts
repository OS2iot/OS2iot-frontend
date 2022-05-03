import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { GatewayStatus } from '../gateway.model';

@Component({
  selector: 'app-gateway-status',
  templateUrl: './gateway-status.component.html',
  styleUrls: ['./gateway-status.component.scss'],
})
export class GatewayStatusComponent implements OnInit {
  private readonly columnGatewayName = 'gatewayName';
  dataSource: MatTableDataSource<GatewayStatus>;
  timeColumns: string[] = [];
  displayedColumns: string[] = [];
  nameText = '';
  neverSeenText = '';
  timestampText = '';
  visibleFooterTimeInterval = 1;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.getGatewayStatus();

    this.translate
      .get(['GEN.NAME', 'GEN.NEVER-SEEN', 'LORA-GATEWAY-STATUS.TIMESTAMP'])
      .subscribe((translations) => {
        this.nameText = translations['GEN.NAME'];
        this.neverSeenText = translations['GEN.NEVER-SEEN'];
        this.timestampText = translations['LORA-GATEWAY-STATUS.TIMESTAMP'];
      });
  }

  getGatewayStatus(): void {
    // TODO: Fetch from API on gateway list
    const response: GatewayStatus[] = [
      { id: 'aaa', onlineTimestamps: [moment().toDate()] },
      {
        id: 'bbbbbbbbb',
        onlineTimestamps: [moment().subtract(10, 'hour').toDate()],
      },
    ];

    this.buildColumns(response);
    this.visibleFooterTimeInterval = Math.round(
      this.clamp(this.timeColumns.length / 4, 1, 6)
    );

    this.dataSource = new MatTableDataSource<GatewayStatus>(response);
  }

  private buildColumns(response: GatewayStatus[]) {
    let minDate: Date | null | undefined = response[0]?.onlineTimestamps[0];
    let maxDate: Date | null | undefined = response[0]?.onlineTimestamps[0];

    response.forEach((gateway) => {
      gateway.onlineTimestamps.forEach((timestamp) => {
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

      this.displayedColumns = [this.columnGatewayName].concat(this.timeColumns);
    }
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
    return `${this.nameText}: ${gateway.id}\n${this.timestampText}: ${formattedTime}`;
  }
}
