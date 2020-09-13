import * as fromApp from '@store/app.reducer';
import * as ServiceProfilesActions from '../store/service-profile.actions';
import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { FormGroup, FormControl, Validators, AbstractFormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NameValidator } from '@shared/validators/name.validator';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',
  styleUrls: ['./service-profiles-edit.component.scss']

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: 'Service Profile';
  public id: Guid;
  serviceId: number;
  editMode = false;
  serviceProfileForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) {
    this.id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.serviceId = +params['serviceId'];
      this.editMode = params['serviceId'] != null;
      this.initForm();
    });
    this.translate.get(['PROFILES.SERVICE_PROFILE.GOBACK', 'PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE',])
      .subscribe(translations => {
        this.backButton.label = translations['PROFILES.SERVICE_PROFILE.GOBACK'];
        this.title = translations['PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE'];

      });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(ServiceProfilesActions.updateServiceProfile({ index: this.serviceId, serviceProfile: this.serviceProfileForm.value }));
    } else {
      this.store.dispatch(ServiceProfilesActions.addServiceProfile({ serviceProfile: this.serviceProfileForm.value }));

    }
    this.onCancel();
  }



  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  get f() {
    return this.serviceProfileForm.controls;
  }

  private initForm() {
    let serviceProfileId = this.id;
    let serviceProfileName = 'Navngiv-din-profil';
    let serviceProfileGWData = false;
    let serviceProfileNwkGeoLoc = false;
    let serviceProfileDevStatusReqFreq = 0;
    let serviceProfileReportDevStatusBattery = false;
    let serviceProfileReportDevStatusMargin = false;
    let serviceProfileMinDateRate = 2000;
    let serviceProfileMaxDateRate = 2000;

    if (this.editMode) {
      this.storeSub = this.store
        .select('serviceProfiles')
        .pipe(
          map(serviceProfileState => {
            return serviceProfileState.serviceProfiles.find((serviceProfile, index) => {
              return index === this.serviceId;
            });
          })
        )
        .subscribe(serviceProfile => {
          serviceProfileId = serviceProfile.id;
          serviceProfileName = serviceProfile.name;
          serviceProfileGWData = serviceProfile.addGWMetaData;
          serviceProfileNwkGeoLoc = serviceProfile.nwkGeoLoc;
          serviceProfileDevStatusReqFreq = serviceProfile.devStatusReqFreq;
          serviceProfileReportDevStatusBattery = serviceProfile.reportDevStatusBattery;
          serviceProfileReportDevStatusMargin = serviceProfile.reportDevStatusMargin;
          serviceProfileMinDateRate = serviceProfile.drMin;
          serviceProfileMaxDateRate = serviceProfile.drMax;

        });
    }

    this.serviceProfileForm = new FormGroup({
      id: new FormControl(serviceProfileId),
      name: new FormControl(serviceProfileName, [Validators.required, NameValidator.cannotContainSpace]),
      addGWMetaData: new FormControl(serviceProfileGWData),
      nwkGeoLoc: new FormControl(serviceProfileNwkGeoLoc),
      devStatusReqFreq: new FormControl(serviceProfileDevStatusReqFreq),
      reportDevStatusBattery: new FormControl(serviceProfileReportDevStatusBattery),
      reportDevStatusMargin: new FormControl(serviceProfileReportDevStatusMargin),
      drMin: new FormControl(serviceProfileMinDateRate, Validators.required),
      drMax: new FormControl(serviceProfileMaxDateRate, Validators.required),

    });
  }

}
