import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup, SigfoxgroupsResponse } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { SigfoxContract } from '@shared/models/sigfox-contract.model';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { DeviceType } from '@shared/enums/device-type';
@Component({
  selector: 'app-sigfox-device-edit',
  templateUrl: './sigfox-device-edit.component.html',
  styleUrls: ['./sigfox-device-edit.component.scss']
})
export class SigfoxDeviceEditComponent implements OnInit {

  @Input() iotDevice: IotDevice;
  private organizationId: number;
  public sigfoxGroups: SigfoxGroup[] = [];
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public sigfoxContract: SigfoxContract;
  public sigfoxDeviceTypes: SigfoxDeviceType[] = [];
  public editMode = false;

  constructor(
    public translate: TranslateService,
    private sigfoxService: SigfoxService,
    private sharedVariable: SharedVariableService
    ) {
   }

  ngOnInit(): void {
    this.translate.use('da');
    this.organizationId = this.sharedVariable.getSelectedOrganisationId();
    this.getGroups();
    if (this.iotDevice?.id) {
      this.editMode = true;
    }
  }

  getGroups() {
    this.sigfoxService.getGroups(this.organizationId)
      .subscribe((response: any) => {
        this.sigfoxGroups = response.result;
      });
  }

  changeContractAndDeviceType() {
      this.resetModelOnChangedGroup();
      if (this.iotDevice.sigfoxSettings.groupId) {
        this.getContracts(this.iotDevice?.sigfoxSettings?.groupId);
        this.getDeviceTypes(this.iotDevice?.sigfoxSettings?.groupId);
      }
  }

  resetModelOnChangedGroup() {
    this.iotDevice.sigfoxSettings.endProductCertificate = null;
    this.iotDevice.sigfoxSettings.deviceTypeId = null;
    this.iotDevice.sigfoxSettings.deviceId = null;
  }
  getContracts(groupId: number) {
    this.sigfoxService.getContracts(groupId)
    .subscribe( (response) => {
      this.sigfoxContract = response;
    });
  }

  getDeviceTypes(groupId: number) {
    this.sigfoxService.getDeviceTypes(groupId)
    .subscribe( (response) => {
      this.sigfoxDeviceTypes = response;
    });
  }

}
