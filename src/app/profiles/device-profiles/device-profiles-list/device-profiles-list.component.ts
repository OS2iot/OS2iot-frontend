import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeviceProfile } from '../device-profile.model';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-profiles-list',
  templateUrl: './device-profiles-list.component.html',
  styleUrls: ['./device-profiles-list.component.scss']
})
export class DeviceProfilesListComponent implements OnInit, OnDestroy {
  deviceProfiles: DeviceProfile[];
  subscription: Subscription;
  public pageLimit: 10;
  public pageOffset: 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store
      .select('deviceProfiles')
      .pipe(map(deviceProfileState => deviceProfileState.deviceProfiles))
      .subscribe((deviceProfiles: DeviceProfile[]) => {
        this.deviceProfiles = deviceProfiles;
      });
  }

  onNewDeviceProfile() {
    this.router.navigate(['new-device-profile'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}