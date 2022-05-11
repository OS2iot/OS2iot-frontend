import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProfile, ServiceProfileResponseOne } from '../service-profile.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { BackButton } from '@shared/models/back-button.model';
import { ServiceProfileService } from '../service-profile.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';


@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',
  styleUrls: ['./service-profiles-edit.component.scss']

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: '';
  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public submitButton = '';
  public canEdit = false;
  id: string;
  serviceId: number;
  editMode = false;
  serviceProfile = new ServiceProfile();
  serviceProfileData: ServiceProfile;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private sharedVariableService: SharedVariableService,
    private serviceProfileService: ServiceProfileService,
    private location: Location,
    private meService: MeService
  ) {
  }

  ngOnInit(): void {
    this.translate.get(['PROFILES.NAME', 'PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE', 'PAYLOAD-DECODER.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['PROFILES.NAME'];
        this.title = translations['PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE'];
        this.submitButton = translations['PAYLOAD-DECODER.SAVE'];

      });
    this.id = this.route.snapshot.paramMap.get('serviceId');
    if (this.id) {
      this.getServiceProfile(this.id);
    }
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  private getServiceProfile(id: string) {
    this.subscription = this.serviceProfileService.getOne(id)
      .subscribe(
        (response: ServiceProfileResponseOne) => {
          this.serviceProfile = response.serviceProfile;
          this.serviceProfileData = response.serviceProfile;
        });
  }

  private create(): void {
    this.serviceProfileService.post(this.serviceProfile)
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
    this.serviceProfileService.put(this.serviceProfile)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  private showError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.errorMessages = ['Forbudt'];
      this.errorFields = [];
    } else {
      this.errorFields = [];
      this.errorMessage = '';
      this.errorMessages = [];
      if (error.error?.chirpstackError) {
        this.errorFields.push('name');
        this.errorFields.push('devStatusReqFreq');
        this.errorFields.push('drMax');
        this.errorFields.push('drMin');
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
    }
    this.formFailedSubmit = true;
  }

  onSubmit(): void {
    if (this.serviceProfile.id) {
      this.update();
    } else {
      this.create();
    }
  }

  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(0, event.target.maxLength);
    }
  }

  routeBack(): void {
    this.location.back();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
