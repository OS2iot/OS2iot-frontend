import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import * as ServiceProfilesActions from '../store/service-profile.actions';
import { BackButton } from 'src/app/models/back-button';

@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: string = 'Service Profile Edit';
  id: number;
  editMode = false;
  serviceProfileForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new ServiceProfilesActions.UpdateServiceProfile({
          index: this.id,
          updateServiceProfile: this.serviceProfileForm.value
        })
      );
    } else {
      this.store.dispatch(new ServiceProfilesActions.AddServiceProfile(this.serviceProfileForm.value));
    }
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let serviceProfileName = '';
    let serviceProfileGWData = '{"Json":{"data":1}}';
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
          serviceProfileName = serviceProfile.name;
          serviceProfileBatteryStatus = serviceProfile.reportDevStatusBattery;
          serviceProfileMinDateRate = serviceProfile.drMin;
          serviceProfileMaxDateRate = serviceProfile.drMax;
          serviceProfileReportEndDevice = serviceProfile.targetPER;

        });
    }

    this.serviceProfileForm = new FormGroup({
      name: new FormControl(serviceProfileName, Validators.required),
      reportDevStatusBattery: new FormControl(serviceProfileBatteryStatus, Validators.required),
      drMin: new FormControl(serviceProfileMinDateRate, Validators.required),
      drMax: new FormControl(serviceProfileMaxDateRate, Validators.required),
      targetPER: new FormControl(serviceProfileReportEndDevice, Validators.required)


    });
  }

}
