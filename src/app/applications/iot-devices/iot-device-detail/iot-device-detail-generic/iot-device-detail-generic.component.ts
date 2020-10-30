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
  private deleteDialogSubscription: Subscription;

  private readonly CHIRPSTACK_BATTERY_NOT_AVAILIBLE = 255;

  constructor(
    private translate: TranslateService,
    public iotDeviceService: IoTDeviceService,
    private location: Location,
    private deleteDialogService: DeleteDialogService,
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
      this.deleteDialogSubscription = this.deleteDialogService.showSimpleDeleteDialog().subscribe(
        (response) => {
          if (response) {
            this.iotDeviceService.deleteIoTDevice(this.device.id).subscribe(
                (response) => {
                  this.routeBack();
              }
            );
          } else {
            console.log(response);
          }
        }
      );
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
    if (this.device?.lorawanSettings?.deviceStatusBattery === this.CHIRPSTACK_BATTERY_NOT_AVAILIBLE) {
      return null;
    }
    return Math.round(this.device?.lorawanSettings?.deviceStatusBattery) 
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

}
