import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { SigfoxContract } from '@shared/models/sigfox-contract.model';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ErrorMessageService } from '@shared/error-message.service';
import { ErrorMessage } from '@shared/models/error-message.model';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';


@Component({
  selector: 'app-sigfox-device-types-edit',
  templateUrl: './sigfox-device-types-edit.component.html',
  styleUrls: ['./sigfox-device-types-edit.component.scss']
})
export class SigfoxDeviceTypesEditComponent implements OnInit {
  sigfoxDeviceType = new SigfoxDeviceType();
  public sigfoxGroup: SigfoxGroup;
  private sigfoxGroupId: number;
  private deviceTypeId: string;
  public sigfoxContracts: SigfoxContract[];
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/sigfox' };
  public title = '';
  public submitButton = '';
  public canEdit = false;
  organizationId: number;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private sigfoxService: SigfoxService,
    private location: Location,
    private sharedVariable: SharedVariableService,
    private meService: MeService,
    private errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate
      .get(['NAV.SIGFOX-DEVICE-TYPES', 'FORM.EDIT-SIGFOX-DEVICE-TYPE', 'ORGANISATION.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.SIGFOX-DEVICE-TYPES'];
        this.title = translations['FORM.EDIT-SIGFOX-DEVICE-TYPE'];
        this.submitButton = translations['ORGANISATION.SAVE'];
      });
    this.organizationId = this.sharedVariable.getSelectedOrganisationId();
    this.sigfoxGroupId = +this.route.snapshot.paramMap.get('groupId');
    this.deviceTypeId = this.route.snapshot.paramMap.get('deviceTypeId');
    if (this.deviceTypeId) {
      this.getDeviceType();
    } else {
      this.sigfoxDeviceType.groupId = this.sigfoxGroupId;
    }
    this.getContracts(this.sigfoxGroupId);
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  private getContracts(groupId: number) {
    this.sigfoxService.getContracts(groupId)
      .subscribe((response: any) => {
        this.sigfoxContracts = response;
      });
  }

  private getDeviceType() {
    this.sigfoxService.getDeviceType(this.deviceTypeId, this.sigfoxGroupId)
      .subscribe( (response) => {
        this.sigfoxDeviceType = response;
        this.sigfoxDeviceType.groupId = this.sigfoxGroupId;
        this.sigfoxDeviceType.contractId = response.contract?.id;
      });
  }

  private create(): void {
    this.sigfoxService.postDeviceType(this.sigfoxDeviceType).subscribe(
      (response) => {
        console.log(response);
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
      }
    );
  }

  private update(): void {
    this.sigfoxService.putDeviceType(this.sigfoxDeviceType).subscribe(
      (response) => {
        this.routeBack();
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  onSubmit(): void {
    if (this.sigfoxDeviceType.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    const errorMessages: ErrorMessage = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errorMessages.errorFields;
    this.errorMessages = errorMessages.errorMessages;
  }

  routeBack(): void {
    this.location.back();
  }

}
