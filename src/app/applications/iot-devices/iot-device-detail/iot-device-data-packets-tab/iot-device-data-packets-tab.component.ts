import { Component, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { IotDeviceDetailsService } from "@applications/iot-devices/iot-device-details-service";

@Component({
  selector: "app-iot-device-data-packets-tab",
  templateUrl: "./iot-device-data-packets-tab.component.html",
  styleUrls: ["./iot-device-data-packets-tab.component.scss"],
  standalone: false,
})
export class IotDeviceDataPacketsTabComponent implements OnInit {
  device: IotDevice;
  constructor(private iotDeviceDetailsService: IotDeviceDetailsService) {}

  ngOnInit(): void {
    this.device = this.iotDeviceDetailsService.device;
  }
}
