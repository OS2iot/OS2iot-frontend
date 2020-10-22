import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@app/admin/permission/permission.service';
import { Subscription } from 'rxjs';
import { UserResponse } from '../user.model';
import { UserService } from '../user.service';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { ApplicationService } from '@applications/application.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Application } from '@applications/application.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { OrganisationResponse } from '@app/admin/organisation/organisation.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  public pageLimit: number = 10;
  public pageTotal: number;
  public pageOffset = 0;
  public applications: Application[];
  private applicationsSubscription: Subscription;

  organisation: OrganisationResponse;
  user: UserResponse;
  permissions: PermissionResponse[];
  @Output() deleteUser = new EventEmitter();
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/users',
  };
  public buttons: QuickActionButton[] = [
    {
      label: 'USERS.DELETE',
      type: 'delete',
    },
    {
      label: 'USERS.EDIT',
      type: 'edit',
    },
  ];
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private permissionsService: PermissionService,
    private router: Router,
    private applicationService: ApplicationService,
    private globalService: SharedVariableService,
    private organisationService: OrganisationService,
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('user-id');
    if (this.id > 0) {
      this.getUser(this.id);
    }
    this.translate.get(['NAV.USERS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.USERS'];
      });
  }

  private getUser(id: number) {
    this.subscription = this.userService
      .getOne(id, true)
      .subscribe((response) => {
        this.user = response;
        this.permissions = response.permissions;
      });
  }

  deletePermission(id: number) {
    this.permissionsService.deletePermission(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getUser(this.id);
      }
    });
  }

  onDeleteUser() {
    this.deleteUser.emit(this.user.id);
    this.router.navigate(['admin/users']);
  }

  onEditUser() {
    this.router.navigate(['edit-user'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }
}
