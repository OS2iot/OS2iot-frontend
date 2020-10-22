import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { OrganisationResponse } from '../organisation.model';
import { BackButton } from '@shared/models/back-button.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { PermissionService } from '@app/admin/permission/permission.service';

@Component({
  selector: 'app-organisation-detail',
  templateUrl: './organisation-detail.component.html',
  styleUrls: ['./organisation-detail.component.scss'],
})
export class OrganisationDetailComponent implements OnInit, OnChanges, OnDestroy {
  isLoadingResults = true;
  resultsLength = 10;

  public pageLimit: number = 10;
  public pageTotal: number;
  public pageOffset = 0;
  public applications: Application[];
  private applicationsSubscription: Subscription;

  organisation: OrganisationResponse;
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/organisations',
  };
  id: number;
  subscription: Subscription;
  permissions: PermissionResponse[];

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private applicationService: ApplicationService,
    private globalService: SharedVariableService,
    private permissionsService: PermissionService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getApplications();
  }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('org-id');
    if (this.id > 0) {
      this.getOrganisation(this.id);
    }
    this.translate.get(['NAV.ORGANISATIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.ORGANISATIONS'];
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }

  private getOrganisation(id: number) {
    this.subscription = this.organisationService
      .getOne(id)
      .subscribe((response) => {
        this.organisation = response;
        this.applications = response.applications;
        this.permissions = response.permissions;
      });
  }

  prevPage() {
    if (this.pageOffset) {
      this.pageOffset--;
    }
    this.getApplications();
  }

  nextPage() {
    if (this.pageOffset < this.pageTotal) {
      this.pageOffset++;
    }
    this.getApplications();
  }

  deletePermission(id: number) {
    this.permissionsService.deletePermission(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getOrganisation(this.id);
      }
    });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getOrganisation(this.id);
      }
    });
  }


  getApplications(orgId?: number): void {
    this.applicationsSubscription = this.applicationService
      .getApplications(
        this.pageLimit,
        this.pageOffset * this.pageLimit,
        null,
        null,
      )
      .subscribe((applications) => {
        this.applications = applications.data;
        this.isLoadingResults = false;
        if (this.pageLimit) {
          this.pageTotal = Math.ceil(applications.count / this.pageLimit);
        }
      });
  }
}
