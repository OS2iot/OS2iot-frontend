import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { DeviceType } from '@shared/enums/device-type';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { Subscription } from 'rxjs';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';

@Component({
  selector: 'app-iot-device-detail-generic',
  templateUrl: './iot-device-detail-generic.component.html',
  styleUrls: ['./iot-device-detail-generic.component.scss']
})
export class IotDeviceDetailGenericComponent implements OnInit, OnChanges, OnDestroy {
  batteryStatusColor = 'green';
  batteryStatusPercentage: number;
  @Input() device: IotDevice;
  @Input() latitude = 0;
  @Input() longitude = 0;
  deleteDevice = new EventEmitter();

  private readonly CHIRPSTACK_BATTERY_NOT_AVAILIBLE = 255;

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
    if (this.device?.lorawanSettings?.deviceStatusBattery === this.CHIRPSTACK_BATTERY_NOT_AVAILIBLE) {
      return null;
    }
    return Math.round(this.device?.lorawanSettings?.deviceStatusBattery);
  }

  ngOnDestroy(): void {

  }

}
