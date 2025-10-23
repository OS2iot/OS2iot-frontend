import { Component, Input, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";

@Component({
  selector: "app-iot-device-detail-sigfox",
  templateUrl: "./iot-device-detail-sigfox.component.html",
  styleUrls: ["./iot-device-detail-sigfox.component.scss"],
  standalone: false,
})
export class IotDeviceDetailSigfoxComponent implements OnInit {
  @Input() device: IotDevice;

  constructor() {}

  ngOnInit(): void {}
}
