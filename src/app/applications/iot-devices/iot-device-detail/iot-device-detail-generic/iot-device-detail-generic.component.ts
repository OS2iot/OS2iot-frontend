import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { DeviceType } from '@shared/enums/device-type';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.batteryStatusPercentage = this.getBatteryProcentage();
  }


  clickDelete() {
    if (this.device.type == DeviceType.SIGFOX) {
      this.showSigfoxDeleteDialog();
    } else {
      this.iotDeviceService.deleteIoTDevice(this.device.id).subscribe((response) => {
        this.deleteDevice.emit(this.device.id);
      });
      this.routeBack();
    }
  }

  showSigfoxDeleteDialog() {
    const dialog = this.dialog.open(DeleteDialogComponent, {
      data: {
        message: 'Sigfox enheder kan ikke slettes fra OS2IoT, de skal slettes fra backend.sigfox.com, hvorefter de automatisk bliver slettet fra OS2IoT inden for få minutter',
        showAccept: false,
        showCancel: true
      }
    });
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
