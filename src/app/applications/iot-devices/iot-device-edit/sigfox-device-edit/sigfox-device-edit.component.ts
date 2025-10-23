import { Component, Input, OnInit } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { SigfoxGroup } from "@shared/models/sigfox-group.model";
import { SigfoxService } from "@shared/services/sigfox.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { SigfoxDeviceType, SigfoxDeviceTypeResponse } from "@shared/models/sigfox-device-type.model";
import { SigfoxDevice, SigfoxDevicesResponse } from "@app/sigfox/sigfox-device.model";
@Component({
    selector: "app-sigfox-device-edit",
    templateUrl: "./sigfox-device-edit.component.html",
    styleUrls: ["./sigfox-device-edit.component.scss"],
    standalone: false
})
export class SigfoxDeviceEditComponent implements OnInit {
  @Input() iotDevice: IotDevice;
  @Input() errorFields: string[];
  @Input() formFailedSubmit = false;
  public errorMessages: any;
  private organizationId: number;
  public sigfoxGroups: SigfoxGroup[] = [];
  public sigfoxDevices: SigfoxDevice[];
  public sigfoxDeviceTypes: SigfoxDeviceType[] = [];
  public editMode = false;

  constructor(
    public translate: TranslateService,
    private sigfoxService: SigfoxService,
    private sharedVariable: SharedVariableService
  ) {}

  ngOnInit(): void {
    this.translate.use("da");
    this.organizationId = this.sharedVariable.getSelectedOrganisationId();
    this.getGroups();
    if (this.iotDevice?.id) {
      this.editMode = true;
      this.getDeviceTypes(this.iotDevice.sigfoxSettings.groupId);
    }
  }
  getGroups() {
    this.sigfoxService.getGroups(this.organizationId).subscribe((response: any) => {
      this.sigfoxGroups = response.data;
    });
  }

  getDevicesInGroup(groupId: number) {
    this.sigfoxService.getDevices(groupId).subscribe((response: SigfoxDevicesResponse) => {
      this.sigfoxDevices = response.data;
    });
  }

  onGroupChange() {
    this.adjustModelOnChangedGroup();
    if (this.iotDevice.sigfoxSettings.groupId) {
      this.getDeviceTypes(this.iotDevice?.sigfoxSettings?.groupId);
      this.getDevicesInGroup(this.iotDevice?.sigfoxSettings?.groupId);
    }
  }

  adjustModelOnChangedGroup() {
    this.iotDevice.sigfoxSettings.groupId = +this.iotDevice.sigfoxSettings.groupId;
    this.iotDevice.sigfoxSettings.endProductCertificate = null;
    this.iotDevice.sigfoxSettings.deviceTypeId = null;
    this.iotDevice.sigfoxSettings.deviceId = null;
  }

  getDeviceTypes(groupId: number) {
    this.sigfoxService.getDeviceTypes(groupId).subscribe((response: SigfoxDeviceTypeResponse) => {
      this.sigfoxDeviceTypes = response.data;
    });
  }
}
