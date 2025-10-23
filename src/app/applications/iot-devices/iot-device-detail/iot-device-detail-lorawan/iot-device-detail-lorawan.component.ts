import { Component, Input, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { DeviceProfileService } from "@profiles/device-profiles/device-profile.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-iot-device-detail-lorawan",
    templateUrl: "./iot-device-detail-lorawan.component.html",
    styleUrls: ["./iot-device-detail-lorawan.component.scss"],
    standalone: false
})
export class IotDeviceDetailLorawanComponent implements OnInit {
  @Input() device: IotDevice;
  deviceProfileSubscription: Subscription;
  public OTAA: boolean;
  public deviceProfileName: string;

  constructor(private deviceProfileService: DeviceProfileService) {}

  ngOnInit(): void {
    this.getDeviceProfil();
  }

  getDeviceProfil() {
    this.deviceProfileSubscription = this.deviceProfileService
      .getOne(this.device.lorawanSettings?.deviceProfileID)
      .subscribe(response => {
        this.OTAA = response.deviceProfile.supportsJoin;
        this.deviceProfileName = response.deviceProfile.name;
      });
  }
}
