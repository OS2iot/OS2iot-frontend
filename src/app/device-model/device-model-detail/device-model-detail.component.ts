import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { BackButton } from '@shared/models/back-button.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { Subscription } from 'rxjs';
import { DeviceModelService } from '../device-model.service';
import { DeviceModel } from '../device.model';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-device-model-detail',
  templateUrl: './device-model-detail.component.html',
  styleUrls: ['./device-model-detail.component.scss']
})
export class DeviceModelDetailComponent implements OnInit, OnDestroy {

  deviceModel: DeviceModel;
  public backButton: BackButton = { label: '', routerLink: 'device-model' };
  public title: string;
  deleteDialogSubscription: Subscription;
  dropdownButton: DropdownButton;
  errorTitle: string;
  canEdit: boolean;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private deviceModelService: DeviceModelService,
    private deleteDialogservice: DeleteDialogService,
    private router: Router,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    const deviceModelId = +this.route.snapshot.paramMap.get('deviceId');
    if (deviceModelId) {
      this.getDeviceModel(deviceModelId);
      this.dropdownButton = {
        label: '',
        editRouterLink: '/device-model/device-model-edit/' + deviceModelId,
        isErasable: true,
      };
    }
    this.translate.use('da');
    this.translate.get(['DEVICE-MODEL.DETAIL-TITLE', 'DEVICE-MODEL.DEVICE-MODEL', 'DEVICE-MODEL.SHOW-OPTIONS', 'DEVICE-MODEL.DELETE-FAILED'])
      .subscribe(translations => {
        this.backButton.label = translations['DEVICE-MODEL.DEVICE-MODEL'];
        this.dropdownButton.label = translations['DEVICE-MODEL.SHOW-OPTIONS'];
        this.title = translations['DEVICE-MODEL.DETAIL-TITLE'];
        this.errorTitle = translations['DEVICE-MODEL.DELETE-FAILED'];
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  private getDeviceModel(id: number) {
    this.deviceModelService.get(id)
      .subscribe((response) => {
        this.deviceModel = response;
      });
  }

  public clickDelete() {
    this.deleteDialogSubscription = this.deleteDialogservice.showSimpleDialog()
      .subscribe(
        (response) => {
          if (response) {
            this.deviceModelService.delete(this.deviceModel.id)
              .subscribe(
                (response) => {
                  if (response.ok && response.body.affected > 0) {
                    this.router.navigate(['device-model']);
                  } else {
                    this.deleteDialogSubscription = this.deleteDialogservice.showSimpleDialog(
                      response.error.message,
                      false,
                      false,
                      true,
                      this.errorTitle).subscribe();
                  }
                }
              );
          } else {
            console.log(response);
          }
        }
      );
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

}
