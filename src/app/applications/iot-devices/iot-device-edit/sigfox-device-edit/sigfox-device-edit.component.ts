import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

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

  constructor(
    public translate: TranslateService,
    private sigfoxService: SigfoxService,
    private sharedVariable: SharedVariableService
    ) {
   }

  ngOnInit(): void {
    this.translate.use('da');
    this.sharedVariable.getValue().subscribe((organisationId) => {
      this.organizationId = organisationId;
    });
    this.sigfoxService.getManyGroups(this.organizationId)
      .subscribe((response) => {
        this.sigfoxGroups = response ? response : [];
      });

  }

  getContracts() {
    this.sigfoxService.getContracts(this.iotDevice.sigfoxSettings?.groupId)
    .subscribe( (response) => {
        
    });
  }

}
