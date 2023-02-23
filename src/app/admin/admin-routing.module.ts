import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationDetailComponent } from './organisation/organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation/organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { PermissionDetailComponent } from './permission/permission-detail/permission-detail.component';
import { PermissionEditComponent } from './permission/permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionComponent } from './permission/permission.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';
import { ApiKeyComponent } from './api-key/api-key.component';
import { ApiKeyListComponent } from './api-key/api-key-list/api-key-list.component';
import { ApiKeyEditComponent } from './api-key/api-key-edit/api-key-edit.component';
import { AcceptUserComponent } from './users/accept-user/accept-user.component';
import { UserTableTabComponent } from '@app/admin/users/user-list/user-table-tab/user-table-tab.component';
import { AwaitingUsersTableTabComponent } from '@app/admin/users/user-list/awaiting-user-tab/awaiting-users-table-tab.component';

const adminRoutes: Routes = [
  {
    path: 'organisations',
    component: OrganisationComponent,
    children: [
      { path: '', component: OrganisationListComponent },
      { path: 'new-organisation', component: OrganisationEditComponent },
      { path: ':org-id', component: OrganisationDetailComponent },
      {
        path: ':org-id/edit-organisation',
        component: OrganisationEditComponent,
      },
    ],
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListComponent,
        children: [
          { path: 'existing', component: UserTableTabComponent },
          { path: 'awaiting', component: AwaitingUsersTableTabComponent },
        ],
      },
      { path: 'organization/:organization-id', component: UserListComponent },
      { path: 'new-user', component: UserEditComponent },
      { path: ':user-id', component: UserDetailComponent },
      { path: ':user-id/edit-user', component: UserEditComponent },
      { path: 'accept-user/:user-id/:org-id', component: AcceptUserComponent },
    ],
  },
  {
    path: 'permissions',
    component: PermissionComponent,
    children: [
      { path: '', component: PermissionListComponent },
      { path: 'new-permission', component: PermissionEditComponent },
      { path: ':permission-id', component: PermissionDetailComponent },
      {
        path: ':permission-id/edit-permission',
        component: PermissionEditComponent,
      },
    ],
  },
  {
    path: 'api-key',
    component: ApiKeyComponent,
    children: [
      { path: '', component: ApiKeyListComponent },
      { path: 'new-api-key', component: ApiKeyEditComponent },
      {
        path: ':api-key-id/edit-api-key',
        component: ApiKeyEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
