import * as fromApp from '@store/app.reducer';
import * as DeviceProfilesActions from '../store/device-profile.actions';
import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { DeviceProfile } from '../device-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-profiles-detail',
  templateUrl: './device-profiles-detail.component.html',

})
export class DeviceProfilesDetailComponent implements OnInit {
  public backButton: BackButton = { label: 'Go back', routerLink: '/profiles' };
  public title: '';
  deviceProfile: DeviceProfile;
  deviceId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private translate: TranslateService
  ) { translate.use('da'); }

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => {
          return +params['deviceId'];
        }),
        switchMap(id => {
          this.deviceId = id;
          return this.store.select('deviceProfiles');
        }),
        map(deviceProfilesState => {
          return deviceProfilesState.deviceProfiles.find((deviceProfile, index) => {
            return index === this.deviceId;
          });
        })
      )
      .subscribe(deviceProfile => {
        this.deviceProfile = deviceProfile;
      });

  }


  onEditDeviceProfile() {
    this.router.navigate(['edit-device-profile'], { relativeTo: this.route });
  }

  onDeleteDeviceProfile() {
    this.store.dispatch(DeviceProfilesActions.deleteDeviceProfile({ index: this.deviceId }));
    this.router.navigate(['/profiles']);
  }

}
