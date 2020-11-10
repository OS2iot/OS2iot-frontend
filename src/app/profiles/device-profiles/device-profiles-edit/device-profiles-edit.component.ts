import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';
import { DeviceProfile } from '../device-profile.model';
import { DeviceProfileService } from '../device-profile.service';

@Component({
  selector: 'app-device-profiles-edit',
  templateUrl: './device-profiles-edit.component.html',
  styleUrls: ['./device-profiles-edit.component.scss']
})
export class DeviceProfilesEditComponent implements OnInit, OnDestroy {
  id: string;
  deviceProfile = new DeviceProfile();
  subscription: Subscription;

  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public title = '';
  public backButton: BackButton = { label: '', routerLink: '/profiles' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private deviceProfileService: DeviceProfileService,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.translate.get(['PROFILES.NAME', 'FORM.EDIT-DEVICE-PROFILE'])
      .subscribe(translations => {
        this.title = translations['FORM.EDIT-DEVICE-PROFILE'];
        this.backButton.label = translations['PROFILES.NAME'];
      });

    this.id = this.route.snapshot.paramMap.get('deviceId');
    if (this.id) {
      this.getDeviceProfile(this.id);
    }
  }

  getDeviceProfile(id: string) {
    this.subscription = this.deviceProfileService.getOne(id)
      .subscribe(
        (response) => {
          this.deviceProfile = response.deviceProfile;
          this.deviceProfile.factoryPresetFreqsInput = this.deviceProfile.factoryPresetFreqs.map(String).join();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  private create(): void {
    this.deviceProfileService.post(this.deviceProfile)
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
    this.deviceProfileService.put(this.deviceProfile)
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

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
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

  onSubmit(): void {
    if (this.deviceProfile.factoryPresetFreqsInput) {
      const splitToNumberString = this.deviceProfile.factoryPresetFreqsInput.split(',');
      const convToNumberArray: number[] = splitToNumberString.map(Number);
      this.deviceProfile.factoryPresetFreqs = convToNumberArray;
    }
    if (this.deviceProfile.id) {
      this.update();
    } else {
      this.create();
    }
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
