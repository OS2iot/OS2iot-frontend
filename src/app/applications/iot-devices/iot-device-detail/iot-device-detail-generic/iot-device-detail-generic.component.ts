import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-iot-device-detail-generic',
  templateUrl: './iot-device-detail-generic.component.html',
  styleUrls: ['./iot-device-detail-generic.component.scss']
})
export class IotDeviceDetailGenericComponent implements OnInit, OnChanges {
  batteryStatusColor = 'green';
  batteryStatusPercentage: number;
  @Input() device: IotDevice;
  @Input() latitude = 0;
  @Input() longitude = 0;
  deleteDevice = new EventEmitter();

  constructor(
    private translate: TranslateService,
    public iotDeviceService: IoTDeviceService,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.batteryStatusPercentage = this.getBatteryProcentage();
  }


  clickDelete() {
    const id = this.device.id;
    this.iotDeviceService.deleteIoTDevice(id).subscribe((response) => {
      this.deleteDevice.emit(id);
    });
    this.routeBack();
  }

  routeBack(): void {
    this.location.back();
  }
  getCoordinates() {
    return {
        longitude: this.longitude,
        latitude: this.latitude,
        draggable: false,
        editEnabled: false,
        useGeolocation: false
    };
}

  getBatteryProcentage(): number {
    const percentage = Math.round((this.device?.lorawanSettings?.deviceStatusBattery / this.device?.lorawanSettings?.deviceStatusMargin) * 100);
    return percentage;
  }

}
