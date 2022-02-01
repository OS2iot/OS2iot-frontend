import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
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
  selector: 'app-sigfox-groups-edit',
  templateUrl: './sigfox-groups-edit.component.html',
  styleUrls: ['./sigfox-groups-edit.component.scss']
})
export class SigfoxGroupsEditComponent implements OnInit, OnDestroy {
  sigfoxGroupId: number;
  sigfoxGroup = new SigfoxGroup();
  subscription: Subscription;
  isLoading = false;

  public errorMessage: string;
  public errorMessages: string[];
  public errorFields = [];
  public formFailedSubmit = false;
  public title = '';
  public backButton: BackButton = { label: '', routerLink: '/administration' };
  canEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private sigfoxService: SigfoxService,
    private location: Location,
    private sharedVariable: SharedVariableService,
    private errorMessageService: ErrorMessageService,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.translate.get(['SIGFOX-GROUP.SIGFOX-GROUP', 'FORM.EDIT-SIGFOX-GROUPS'])
      .subscribe(translations => {
        this.title = translations['FORM.EDIT-SIGFOX-GROUPS'];
        this.backButton.label = translations['SIGFOX-GROUP.SIGFOX-GROUP'];
      });

    this.sigfoxGroupId = +this.route.snapshot.paramMap.get('groupId');
    if (this.sigfoxGroupId) {
      this.getSigfoxGroup(this.sigfoxGroupId);
    }
    this.sigfoxGroup.organizationId = this.sharedVariable.getSelectedOrganisationId();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  getSigfoxGroup(id: number) {
    this.subscription = this.sigfoxService.getGroup(id)
      .subscribe(
        (response) => {
          this.sigfoxGroup = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  private create(): void {
    this.sigfoxService.createGroupConnection(this.sigfoxGroup)
      .subscribe(
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
    this.sigfoxService.updateGroupConnection(this.sigfoxGroup, this.sigfoxGroup.id)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  routeBack(): void {
    this.location.back();
  }

  private showError(error: HttpErrorResponse) {
    const errorMessages: ErrorMessage = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorMessages = errorMessages.errorMessages;
    this.errorFields = errorMessages.errorFields;
    this.formFailedSubmit = true;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.sigfoxService.getGroup(this.sigfoxGroupId).subscribe(
      (response: any) => {
        if (response.data.length !== 0 || response.data === undefined) {
          this.update();
        } else {
          this.create();
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
