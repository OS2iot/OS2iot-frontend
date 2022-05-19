import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ServiceProfile,
  ServiceProfileResponseMany,
} from '../service-profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceProfileService } from '../service-profile.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-service-profiles-list',
  templateUrl: './service-profiles-list.component.html',
  styleUrls: ['./service-profiles-list.component.scss'],
})
export class ServiceProfilesListComponent implements OnInit, OnDestroy {
  serviceProfiles: ServiceProfile[];
  serviceSubscription: Subscription;
  public pageLimit = environment.tablePageSize;
  public pageOffset: 0;

  public errorMessages: string;
  deleteDialogSubscription: Subscription;
  errorTitle: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceProfileService: ServiceProfileService,
    private sharedVariableService: SharedVariableService,
    private deleteDialogService: DeleteDialogService,
    private translateService: TranslateService,
    private meService: MeService
  ) { }

  ngOnInit() {
    this.translateService
      .get(['PROFILES.DELETE-FAILED'])
      .subscribe((translations) => {
        this.errorTitle = translations['PROFILES.DELETE-FAILED'];
      });
    this.getServiceProfileList();
  }

  getServiceProfileList() {
    this.serviceSubscription = this.serviceProfileService
      .getMultiple()
      .subscribe((result: ServiceProfileResponseMany) => {
        this.serviceProfiles = result.result;
        this.setCanEdit();
      });
  }

  canCreate() {
    return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  setCanEdit() {
    this.serviceProfiles.forEach(
      (serviceProfile) => {
        serviceProfile.canEdit = this.canCreate();
      }
    );
  }

  deleteServiceProfile(id: string) {
    if (id) {
      this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
        (response) => {
          if (response) {
            this.serviceProfileService.delete(id).subscribe((response) => {
              console.log(response);
              if (response.ok) {
                this.getServiceProfileList();
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
    if (this.serviceSubscription && this.serviceSubscription?.closed) {
      this.serviceSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
