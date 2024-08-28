import { Component, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { IotDeviceDetailsService } from "@applications/iot-devices/iot-device-details-service";

@Component({
    selector: "app-iot-device-downlink-tab",
    templateUrl: "./iot-device-downlink-tab.component.html",
    styleUrls: ["./iot-device-downlink-tab.component.scss"],
})
export class IotDeviceDownlinkTabComponent implements OnInit {
    device: IotDevice;
    public errorMessages: string[];
    constructor(private iotDeviceDetailsService: IotDeviceDetailsService) {}

    ngOnInit(): void {
        this.device = this.iotDeviceDetailsService.device;
    }
}
