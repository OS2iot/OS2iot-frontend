import * as fromApp from '@store/app.reducer';
import * as ServiceProfilesActions from '../store/service-profile.actions';
import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',
  styleUrls: ['./service-profiles-edit.component.scss']

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: 'Service Profile';
  id: number;
  editMode = false;
  serviceProfileForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.translate.get(['PROFILES.SERVICE_PROFILE.GOBACK', 'PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE',])
      .subscribe(translations => {
        this.backButton.label = translations['PROFILES.SERVICE_PROFILE.GOBACK'];
        this.title = translations['PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE'];

      });
  }

  onSubmit() {
    // if (this.editMode) {
    //   this.store.dispatch(
    //     new ServiceProfilesActions.UpdateServiceProfile({
    //       index: this.id,
    //       updateServiceProfile: this.serviceProfileForm.value
    //     })
    //   );
    // } else {
    //   this.store.dispatch(new ServiceProfilesActions.AddServiceProfile(this.serviceProfileForm.value));
    // }
    // this.store.dispatch(new ServiceProfilesActions.StoreServiceProfiles());
    // this.onCancel();
    if (this.editMode) {
      this.store.dispatch(ServiceProfilesActions.updateServiceProfile({ index: this.id, serviceProfile: this.serviceProfileForm.value }));
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

  private initForm() {
    let serviceProfileId = "a735a64c-8ffb-4c25-bb82-0de1108e7bd7"
    let serviceProfileName = 'Navngiv din profil';
    let serviceProfileGWData = false;
    let serviceProfileBatteryStatus = true;
    let serviceProfileMinDateRate = 2000;
    let serviceProfileMaxDateRate = 2000;
    let serviceProfileReportEndDevice = 2000;

    if (this.editMode) {
      this.storeSub = this.store
        .select('serviceProfiles')
        .pipe(
          map(serviceProfileState => {
            return serviceProfileState.serviceProfiles.find((serviceProfile, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(serviceProfile => {
          serviceProfileId = serviceProfile.id
          serviceProfileName = serviceProfile.name;
          serviceProfileGWData = serviceProfile.addGWMetaData;
          serviceProfileBatteryStatus = serviceProfile.reportDevStatusBattery;
          serviceProfileMinDateRate = serviceProfile.drMin;
          serviceProfileMaxDateRate = serviceProfile.drMax;
          serviceProfileReportEndDevice = serviceProfile.targetPER;

        });
    }

    this.serviceProfileForm = new FormGroup({
      id: new FormControl(serviceProfileId),
      name: new FormControl(serviceProfileName, Validators.required),
      addGWMetaData: new FormControl(serviceProfileGWData),
      reportDevStatusBattery: new FormControl(serviceProfileBatteryStatus, Validators.required),
      drMin: new FormControl(serviceProfileMinDateRate, Validators.required),
      drMax: new FormControl(serviceProfileMaxDateRate, Validators.required),
      targetPER: new FormControl(serviceProfileReportEndDevice, Validators.required)


    });
  }

}
