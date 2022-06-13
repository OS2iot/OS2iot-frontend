import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { DeviceProfile } from '../device-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceProfileService } from '../device-profile.service';
import { MeService } from '@shared/services/me.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-device-profiles-list',
  templateUrl: './device-profiles-list.component.html',
  styleUrls: ['./device-profiles-list.component.scss']
})
export class DeviceProfilesListComponent implements OnInit, OnDestroy {
  deviceProfiles: DeviceProfile[];
  subscription: Subscription;
  public pageLimit = environment.tablePageSize;
  public pageOffset: 0;

  public errorMessages: any;
  deleteDialogSubscription: Subscription;
  errorTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private deviceProfileService: DeviceProfileService,
    private meService: MeService,
    private deleteDialogService: DeleteDialogService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.translateService
      .get(['PROFILES.DELETE-FAILED'])
      .subscribe((translations) => {
        this.errorTitle = translations['PROFILES.DELETE-FAILED'];
      });
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
    return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  setCanEdit() {
    this.deviceProfiles.forEach(
      (deviceProfile) => {
        deviceProfile.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite, deviceProfile.internalOrganizationId);
      }
    );
  }

  deleteDeviceProfile(id: string) {
    if (id) {
      this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
        (response) => {
          if (response) {
            this.deviceProfileService.delete(id).subscribe((response) => {
              console.log(response);
              if (response.ok) {
                this.getDeviceProfiles();
              } else {
                if (response?.error?.message === 'Internal server error') {
                  this.errorMessages = 'Internal server error';
                  return;
                } else {
                  this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog(
                    response.error.message,
                    false,
                    false,
                    true,
                    this.errorTitle).subscribe();
                }
              }
            });
          } else {
            console.log(response);
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
