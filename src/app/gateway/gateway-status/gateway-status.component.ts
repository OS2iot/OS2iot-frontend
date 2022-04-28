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
  timestampText = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.getGatewayStatus();

    this.translate
      .get(['GEN.NAME', 'LORA-GATEWAY-STATUS.TIMESTAMP'])
      .subscribe((translations) => {
        this.nameText = translations['GEN.NAME'];
        this.timestampText = translations['LORA-GATEWAY-STATUS.TIMESTAMP'];
      });
  }

  getGatewayStatus(): void {
    // TODO: Fetch from API
    const response: GatewayStatus[] = [
      { id: 'aaa', onlineTimestamps: [moment().toDate()] },
      {
        id: 'bbbbbbbbb',
        onlineTimestamps: [moment().subtract(1, 'day').toDate()],
      },
    ];

    this.buildColumns(response);
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

  getStatusClass(gateway: GatewayStatus, timestamp: string) {
    return gateway.onlineTimestamps.some((gatewayTimestamp) =>
      moment(gatewayTimestamp).isSame(moment(timestamp), 'hour')
    )
      ? 'online'
      : 'offline';
  }

  formatTime(timestamp: string): string {
    return moment(timestamp).format('HH:00');
  }

  formatTooltip(gatewayId: string, timestamp: string): string {
    const formattedTime = moment(timestamp).format('DD-MM-YYYY HH:MM');
    return `${this.nameText}: ${gatewayId}\n${this.timestampText}: ${formattedTime}`;
  }
}
