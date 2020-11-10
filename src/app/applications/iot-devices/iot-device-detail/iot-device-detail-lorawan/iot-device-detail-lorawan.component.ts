import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { DeviceProfileService } from '@profiles/device-profiles/device-profile.service';
import { ServiceProfileResponseOne } from '@profiles/service-profiles/service-profile.model';
import { ServiceProfileService } from '@profiles/service-profiles/service-profile.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-iot-device-detail-lorawan',
  templateUrl: './iot-device-detail-lorawan.component.html',
  styleUrls: ['./iot-device-detail-lorawan.component.scss']
})
export class IotDeviceDetailLorawanComponent implements OnInit {

  @Input() device: IotDevice;
  deviceProfileSubscription: Subscription;
  public OTAA: boolean;
  public deviceProfileName: string;
  public serviceProfileName: string;

  constructor(
    private deviceProfileService: DeviceProfileService,
    private serviceProfileService: ServiceProfileService
  ) { }

  ngOnInit(): void {
    this.getDeviceProfil();
    this.getServiceProfil();
  }

  getDeviceProfil() {
    this.deviceProfileSubscription = this.deviceProfileService.getOne(this.device.lorawanSettings?.deviceProfileID)
        .subscribe((response) => {
            this.OTAA = response.deviceProfile.supportsJoin;
            this.deviceProfileName = response.deviceProfile.name;
        });
  }

  getServiceProfil() {
    this.deviceProfileSubscription = this.serviceProfileService.getOne(this.device.lorawanSettings?.serviceProfileID)
        .subscribe((response: ServiceProfileResponseOne) => {
            this.serviceProfileName = response.serviceProfile.name;
        });
  }

}
