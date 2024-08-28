import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { IoTDeviceService } from "@applications/iot-devices/iot-device.service";
import { environment } from "@environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { jsonToList } from "@shared/helpers/json.helper";
import { KeyValue } from "@shared/types/tuple.type";
import { DeviceType } from "@shared/enums/device-type";

@Component({
  selector: "app-iot-device-detail-generic",
  templateUrl: "./iot-device-detail-generic.component.html",
  styleUrls: ["./iot-device-detail-generic.component.scss"],
})
export class IotDeviceDetailGenericComponent implements OnInit, OnChanges, OnDestroy {
  batteryStatusColor = "green";
  batteryStatusPercentage: number;
  metadataTags: KeyValue[] = [];
  @Input() device: IotDevice;
  @Input() latitude = 0;
  @Input() longitude = 0;
  deleteDevice = new EventEmitter();
  baseUrl: string = environment.baseUrl;
  httpDeviceUrl: string;

  private readonly CHIRPSTACK_BATTERY_NOT_AVAILIBLE = 255;

  constructor(
    private translate: TranslateService,
    public iotDeviceService: IoTDeviceService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.batteryStatusPercentage = this.getBatteryProcentage();
    this.httpDeviceUrl = this.getGenericHttpDeviceUrl();
    if (changes?.device?.previousValue?.metadata !== changes?.device?.currentValue?.metadata && this.device.metadata) {
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

  private getBatteryProcentage(): number {
    if (this.device?.lorawanSettings?.deviceStatusBattery === this.CHIRPSTACK_BATTERY_NOT_AVAILIBLE) {
      return null;
    }
    return Math.round(this.device?.lorawanSettings?.deviceStatusBattery);
  }

  private getGenericHttpDeviceUrl(): string {
    return `${this.baseUrl}receive-data?apiKey=${this.device.apiKey}`;
  }

  ngOnDestroy(): void {}

  protected readonly DeviceType = DeviceType;
}
