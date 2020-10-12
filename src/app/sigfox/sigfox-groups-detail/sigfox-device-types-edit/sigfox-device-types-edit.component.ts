import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageHandler, ErrorMessage } from '@shared/error-message-handler';
import { BackButton } from '@shared/models/back-button.model';
import { SigfoxContract } from '@shared/models/sigfox-contract.model';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sigfox-device-types-edit',
  templateUrl: './sigfox-device-types-edit.component.html',
  styleUrls: ['./sigfox-device-types-edit.component.scss']
})
export class SigfoxDeviceTypesEditComponent implements OnInit {
  sigfoxDeviceType = new SigfoxDeviceType();
  public sigfoxGroups: SigfoxGroup[];
  public sigfoxGroup: SigfoxGroup;
  public sigfoxContracts: SigfoxContract[];
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/sigfox' };
  public title = '';
  public submitButton = '';
  organizationId: number;
  subscription: Subscription;
  errorHandler = new ErrorMessageHandler();

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private sigfoxService: SigfoxService,
    private location: Location,
    private sharedVariable: SharedVariableService
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
    this.getSigFoxGroups(this.organizationId);
    this.getSigFoxGroup(this.organizationId);
  }

  private getSigFoxGroups(orgId: number) {
    this.sigfoxService.getGroups(orgId)
      .subscribe((response: any) => {
        this.sigfoxGroups = response.data;
      });
  }

  private getSigFoxGroup(orgId: number) {
    this.sigfoxService.getGroup(orgId).subscribe();
  }

  public changedGroup() {
    this.sigfoxDeviceType.groupId = +this.sigfoxDeviceType.groupId;
    this.sigfoxDeviceType.contractId = null;
    this.getContracts(this.sigfoxDeviceType.groupId);
    // get contracts
  }

  private getContracts(groupId: number) {
    this.sigfoxService.getContracts(groupId)
      .subscribe((response: any) => {
        this.sigfoxContracts = response;
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
    const errorMessages: ErrorMessage = this.errorHandler.handleErrorMessageWithFields(error);
    this.errorFields = errorMessages.errorFields;
    this.errorMessages = errorMessages.errorMessages;
  }

  routeBack(): void {
    this.location.back();
  }

}
