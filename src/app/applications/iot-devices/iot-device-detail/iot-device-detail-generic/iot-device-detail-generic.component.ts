import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-iot-device-detail-generic',
  templateUrl: './iot-device-detail-generic.component.html',
  styleUrls: ['./iot-device-detail-generic.component.scss']
})
export class IotDeviceDetailGenericComponent implements OnInit, OnChanges {
  batteryStatusColor = 'green';
  batteryStatusPercentage = 50;
  @Input() device: IotDevice;
  @Input() latitude: number;
  @Input() longitude: number;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.batteryStatusPercentage = this.getBatteryProcentage();
  }

  getBatteryProcentage(): number {
    const percentage = Math.round((this.device?.lorawanSettings?.deviceStatusBattery / this.device?.lorawanSettings?.deviceStatusMargin) * 100);
    return percentage;
  }

}
