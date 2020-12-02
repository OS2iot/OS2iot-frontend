import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeviceProfile } from '../device-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceProfileService } from '../device-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MeService } from '@shared/services/me.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

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

  public errorMessages: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceProfileService: DeviceProfileService,
    private meService: MeService,
    private sharedVariableService: SharedVariableService
  ) { }

  ngOnInit() {
    this.getDeviceProfiles();
  }

  getDeviceProfiles() {
    this.subscription = this.deviceProfileService.getMultiple()
      .subscribe((deviceProfiles) => {
        this.deviceProfiles = deviceProfiles.result;
        this.setCanEdit();
      });
  }

  onNewDeviceProfile() {
    this.router.navigate(['deviceprofil/edit']);
  }

  canCreate() {
    return this.sharedVariableService.getHasWritePermission()
  }

  setCanEdit() {
    this.deviceProfiles.forEach(
      (deviceProfile) => {
        deviceProfile.canEdit = this.meService.canWriteInTargetOrganization(deviceProfile.internalOrganizationId);
      }
    );
  }

  deleteDeviceProfile(id: string) {
    if (id) {
      this.deviceProfileService.delete(id).subscribe((response) => {
        console.log(response);
        if (response.ok) {
          this.getDeviceProfiles();
        } else {
          this.showError(response);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private showError(err: HttpErrorResponse) {
    if (err?.error?.message == 'Internal server error') {
      this.errorMessages = 'Internal server error';
      return;
    }

    if (err.error?.message) {
      this.errorMessages = err.error?.message;
    }
  }
}
