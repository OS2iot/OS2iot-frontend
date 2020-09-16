import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ServiceProfile, ServiceProfileResponseOne } from '../service-profile.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceProfileService } from '@shared/services/service-profile.service';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',
  styleUrls: ['./service-profiles-edit.component.scss']

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: '';
  public errorMessage: string;
  public errorMessages: string;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public submitButton = '';
  id: string;
  serviceId: number;
  editMode = false;
  serviceProfile = new ServiceProfile();
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private serviceProfileService: ServiceProfileService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.translate.get(['PROFILES.SERVICE_PROFILE.GOBACK', 'PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE',])
      .subscribe(translations => {
        this.backButton.label = translations['PROFILES.SERVICE_PROFILE.GOBACK'];
        this.title = translations['PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE'];
        this.submitButton = translations['PAYLOAD-DECODER.SAVE'];

      });
    this.id = this.route.snapshot.paramMap.get('serviceId');
    if (this.id) {
      this.getServiceProfile(this.id);
    }
  }

  private getServiceProfile(id: string) {
    this.subscription = this.serviceProfileService.getOne(id)
      .subscribe(
        (response: ServiceProfileResponseOne) => {
          this.serviceProfile = response.serviceProfile;
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
    this.errorFields = [];
    this.errorMessages = '';
    if (error.error?.chirpstackError) {
        this.errorFields.push('name');
        this.errorMessages = error.error.chirpstackError.message;
    } else {
      this.errorMessage = error.message;
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
