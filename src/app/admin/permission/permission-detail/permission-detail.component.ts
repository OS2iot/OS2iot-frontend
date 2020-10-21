import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@app/admin/permission/permission.service';
import { Subscription } from 'rxjs';
import { PermissionResponse } from '../permission.model';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { OrganisationResponse } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { UserResponse } from '@app/admin/users/user.model';


@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit, OnChanges {
  public pageLimit: number = 10;
  public pageTotal: number;
  public pageOffset = 0;
  permission: PermissionResponse;
  permissions: PermissionResponse[];
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/permissions',
  };
  public buttons: QuickActionButton[] = [
    {
      label: 'PERMISSIONS.DELETE',
      type: 'delete',
    },
    {
      label: 'PERMISSIONS.EDIT',
      type: 'edit',
    },
  ];
  id: number;
  subscription: Subscription;
  users: UserResponse[];
  public applications: Application[];
  private applicationsSubscription: Subscription;
  organisation: OrganisationResponse;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private router: Router,
    private applicationService: ApplicationService,
    private globalService: SharedVariableService,
    private organisationService: OrganisationService,
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('permission-id');
    if (this.id > 0) {
      this.getPermission(this.id);
    }
    this.translate.get(['NAV.PERMISSIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PERMISSIONS'];
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPermission(this.id);
  }

  private getPermission(id: number) {
    this.subscription = this.permissionService
      .getPermission(id)
      .subscribe((response) => {
        this.permission = response;
        this.users = response.users;
        this.applications = response.applications;
      });
  }

  onDeletePermission() {
    this.permissionService.deletePermission(this.id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.router.navigate(['admin/permissions']);
      }
    });
  }

  onEditPermission() {
    this.router.navigate(['edit-permission'], { relativeTo: this.route });
  }


  prevPage() {
    if (this.pageOffset) {
      this.pageOffset--;
    }
    this.getPermission(this.id);
  }

  nextPage() {
    if (this.pageOffset < this.pageTotal) {
      this.pageOffset++;
    }
    this.getPermission(this.id);
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getPermission(this.id);
      }
    });
  }

}
