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
  public errorFields: string[];
  public formFailedSubmit = false;
  public title = '';
  public backButton: BackButton = { label: '', routerLink: '/administration' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private sigfoxService: SigfoxService,
    private location: Location,
    private sharedVariable: SharedVariableService
  ) { }

  ngOnInit(): void {

    this.translate.get(['SIGFOX.SIGFOX-GROUP', 'FORM.EDIT-SIGFOX-GROUPS'])
      .subscribe(translations => {
        this.title = translations['FORM.EDIT-SIGFOX-GROUPS'];
        this.backButton.label = translations['SIGFOX.SIGFOX-GROUP'];
      });

    this.sigfoxGroupId = +this.route.snapshot.paramMap.get('groupId');
    if (this.sigfoxGroupId) {
      this.getSigfoxGroup(this.sigfoxGroupId);
    }
    this.sigfoxGroup.organizationId = this.sharedVariable.getSelectedOrganisationId();
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
    this.errorFields = [];
    this.errorMessage = '';
    this.errorMessages = [];
    if (error.error?.chirpstackError) {
      this.errorMessage = error.error.chirpstackError.message;
    } else if (error.error?.message?.length > 0) {
      error.error.message[0].children.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.sigfoxService.getGroup(this.sigfoxGroup.organizationId).subscribe(
      (x: any) => {
        if (this.sigfoxGroup.organizationId) {
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