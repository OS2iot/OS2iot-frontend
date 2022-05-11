import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@app/admin/permission/permission.service';
import { Subscription } from 'rxjs';
import { PermissionResponse } from '../permission.model';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';
import { UserResponse } from '@app/admin/users/user.model';
import { DropdownButton } from '@shared/models/dropdown-button.model';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { environment } from '@environments/environment';
import { Title } from '@angular/platform-browser';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';


@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.scss']
})
export class PermissionDetailComponent implements OnInit, OnChanges {
  isLoadingResults = true;
  public pageLimit: number = environment.tablePageSize;
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
  dropdownButton: DropdownButton;
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private router: Router,
    private titleService: Title,
    private deleteDialogService: DeleteDialogService,
    private meService: MeService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('permission-id');
    if (this.id > 0) {
      this.getPermission(this.id);
      this.dropdownButton = {
        label: '',
        editRouterLink: 'edit-permission',
        isErasable: true,
      };
    }
    this.translate.get(['NAV.PERMISSIONS', 'PERMISSION.DETAIL.DROPDOWN', 'TITLE.PERMISSION'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.PERMISSIONS'];
        this.dropdownButton.label = translations['PERMISSION.DETAIL.DROPDOWN'];
        this.titleService.setTitle(translations['TITLE.PERMISSION']);
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
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
        this.isLoadingResults = false;
      });
  }

  onDeletePermission() {
    this.deleteDialogService.showSimpleDialog().subscribe((response) => {
      if (response) {
        this.permissionService.deletePermission(this.id).subscribe((response) => {
          if (response.ok && response.body.affected > 0) {
            this.router.navigate(['admin/permissions']);
          }
        });
      }
    });
  }

  onEditPermission() {
    this.router.navigate(['edit-permission'], { relativeTo: this.route });
  }

}
