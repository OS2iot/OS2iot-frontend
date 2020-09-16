import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeviceProfile } from '../device-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceProfileService } from '@shared/services/device-profile.service';

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
    private deviceProfileService: DeviceProfileService
  ) { }

  ngOnInit() {
    this.getDeviceProfiles();
  }

  getDeviceProfiles() {
    this.subscription = this.deviceProfileService.getMultiple()
    .subscribe((deviceProfiles) => {
      this.deviceProfiles = deviceProfiles.result;
    });
  }

  onNewDeviceProfile() {
    this.router.navigate(['new-device-profile'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
