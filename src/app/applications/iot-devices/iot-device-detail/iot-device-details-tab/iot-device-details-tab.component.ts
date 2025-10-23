import { Component, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { IotDeviceDetailsService } from "@applications/iot-devices/iot-device-details-service";

@Component({
    selector: "app-iot-device-details-tab",
    templateUrl: "./iot-device-details-tab.component.html",
    styleUrls: ["./iot-device-details-tab.component.scss"],
    standalone: false
})
export class IotDeviceDetailsTabComponent implements OnInit {
  device: IotDevice;
  public latitude: number;
  public longitude: number;

  constructor(private iotDeviceDetailsService: IotDeviceDetailsService) {}

  ngOnInit(): void {
    this.device = this.iotDeviceDetailsService.device;
    this.latitude = this.iotDeviceDetailsService.latitude;
    this.longitude = this.iotDeviceDetailsService.longitude;
  }
}
