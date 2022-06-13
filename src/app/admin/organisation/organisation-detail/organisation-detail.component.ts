import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { OrganisationResponse } from '../organisation.model';
import { BackButton } from '@shared/models/back-button.model';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { PermissionService } from '@app/admin/permission/permission.service';
import { Location } from '@angular/common';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { ApplicationService } from '@applications/application.service';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-organisation-detail',
  templateUrl: './organisation-detail.component.html',
  styleUrls: ['./organisation-detail.component.scss'],
})
export class OrganisationDetailComponent implements OnInit, OnChanges, OnDestroy {
  isLoadingResults = true;
  resultsLength = 10;

  public pageLimit = environment.tablePageSize;
  public pageTotal: number;
  public pageOffset = 0;
  public applications: Application[];
  private applicationsSubscription: Subscription;
  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;

  organisation: OrganisationResponse;
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/organisations',
  };
  id: number;
  subscription: Subscription;
  permissions: PermissionResponse[];
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private permissionsService: PermissionService,
    private deleteDialogService: DeleteDialogService,
    private location: Location,
    private titleService: Title,
    private meService: MeService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('org-id');
    if (this.id > 0) {
      this.getOrganisation(this.id);
    }
    this.dropdownButton = {
      label: '',
      editRouterLink: 'edit-organisation',
      isErasable: true,
    };

    this.translate.get(['NAV.ORGANISATIONS', 'ORGANISATION.DROPDOWN', 'TITLE.ORGANIZATION'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.ORGANISATIONS'];
        this.dropdownButton.label = translations['ORGANISATION.DROPDOWN'];
        this.titleService.setTitle(translations['TITLE.ORGANIZATION']);
      });

    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }

  private getOrganisation(id: number) {
    this.subscription = this.organisationService
      .getOne(id)
      .subscribe((response) => {
        this.organisation = response;
        this.permissions = response.permissions;
      });
  }

  clickDelete() {
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
      (response) => {
        if (response) {
          this.organisationService.delete(this.organisation.id)
            .subscribe(
              (response) => {
                this.location.back();
              });
        } else {
          console.log(response);
        }
      }
    );
  }

  deletePermission(id: number) {
    this.deleteDialogService.showSimpleDialog().subscribe((response) => {
      if (response) {
        this.permissionsService.deletePermission(id).subscribe((response) => {
          if (response.ok && response.body.affected > 0) {
            this.getOrganisation(this.id);
          }
        });
      }
    });
  }
}
