import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import * as ServiceProfilesActions from '../store/service-profile.actions';

@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',

})
export class ServiceProfilesEditComponent implements OnInit {
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
      this.store.dispatch(ServiceProfilesActions.updateServiceProfile({ index: this.id, serviceProfile: this.serviceProfileForm.value }));
    } else {
      this.store.dispatch(ServiceProfilesActions.addServiceProfile({ serviceProfile: this.serviceProfileForm.value }));
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
    let serviceProfileId = '';

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
          serviceProfileId = serviceProfile.id;
        });
    }

    this.serviceProfileForm = new FormGroup({
      name: new FormControl(serviceProfileName, Validators.required),
      id: new FormControl(serviceProfileId, Validators.required),

    });
  }

}
