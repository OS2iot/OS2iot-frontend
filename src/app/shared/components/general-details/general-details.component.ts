import { Component, Input, OnInit } from "@angular/core";
import { OrganisationResponse } from "@app/admin/organisation/organisation.model";
import { PermissionResponse } from "@app/admin/permission/permission.model";
import { UserResponse } from "@app/admin/users/user.model";
import { DeviceModel } from "@app/device-model/device.model";
import { Gateway } from "@app/gateway/gateway.model";
import { Application } from "@applications/application.model";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { PayloadDecoder } from "@payload-decoder/payload-decoder.model";

@Component({
    selector: "app-general-details",
    templateUrl: "./general-details.component.html",
    styleUrls: ["./general-details.component.scss"],
    standalone: false
})
export class GeneralDetailsComponent implements OnInit {
  @Input() data:
    | OrganisationResponse
    | PermissionResponse
    | UserResponse
    | Application
    | IotDevice
    | Datatarget
    | DeviceModel
    | Gateway
    | PayloadDecoder;

  constructor() {}

  ngOnInit(): void {}
}
