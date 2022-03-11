import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { jsonToList } from '@shared/helpers/json.helper';
import { KeyValue } from '@shared/types/tuple.type';

@Component({
  selector: 'app-iot-device-detail-generic',
  templateUrl: './iot-device-detail-generic.component.html',
  styleUrls: ['./iot-device-detail-generic.component.scss'],
})
export class IotDeviceDetailGenericComponent
  implements OnInit, OnChanges, OnDestroy {
  batteryStatusColor = 'green';
  batteryStatusPercentage: number;
  metadataTags: KeyValue[] = [];
  @Input() device: IotDevice;
  @Input() latitude = 0;
  @Input() longitude = 0;
  deleteDevice = new EventEmitter();

  private readonly CHIRPSTACK_BATTERY_NOT_AVAILIBLE = 255;

  constructor(
    private translate: TranslateService,
    public iotDeviceService: IoTDeviceService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.batteryStatusPercentage = this.getBatteryProcentage();

    if (
      changes?.device?.previousValue?.metadata !==
        changes?.device?.currentValue?.metadata &&
      this.device.metadata
    ) {
      this.metadataTags = jsonToList(this.device.metadata);
    }
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
      useGeolocation: false,
    };
  }

  getBatteryProcentage(): number {
    if (
      this.device?.lorawanSettings?.deviceStatusBattery ===
      this.CHIRPSTACK_BATTERY_NOT_AVAILIBLE
    ) {
      return null;
    }
    return Math.round(this.device?.lorawanSettings?.deviceStatusBattery);
  }

  ngOnDestroy(): void {}
}
