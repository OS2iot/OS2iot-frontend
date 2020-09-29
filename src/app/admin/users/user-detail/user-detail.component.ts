import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@app/admin/permission/permission.service';
import { Subscription } from 'rxjs';
import { UserResponse } from '../user.model';
import { UserService } from '../user.service';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
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
    private router: Router
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
      .getOne(id)
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

}
