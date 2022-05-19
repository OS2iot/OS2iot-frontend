import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApplicationsModule } from '@applications/applications.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { SharedModule } from '@shared/shared.module';
import { PermissionDetailComponent } from './permission/permission-detail/permission-detail.component';
import { PermissionEditComponent } from './permission/permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionTabelComponent } from './permission/permission-list/permission-tabel/permission-tabel.component';
import { PermissionComponent } from './permission/permission.component';
import { OrganisationDetailComponent } from './organisation/organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation/organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { OrganisationTabelComponent } from './organisation/organisation-list/organisation-tabel/organisation-tabel.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserTableComponent } from './users/user-list/user-table/user-table.component';
import { UsersComponent } from './users/users.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectSearchModule } from '@shared/components/mat-select-search/mat-select-search.module';
import { ApiKeyComponent } from './api-key/api-key.component';
import { ApiKeyListComponent } from './api-key/api-key-list/api-key-list.component';
import { ApiKeyTableComponent } from './api-key/api-key-list/api-key-table/api-key-table.component';
import { ApiKeyEditComponent } from './api-key/api-key-edit/api-key-edit.component';
import { AwaitingUsersTableComponent } from './users/user-list/awaiting-users-table/awaiting-users-table.component';
import { AcceptUserComponent } from './users/accept-user/accept-user.component';

@NgModule({
  declarations: [
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    UsersComponent,
    UserTableComponent,
    PermissionComponent,
    PermissionEditComponent,
    PermissionDetailComponent,
    PermissionListComponent,
    PermissionTabelComponent,
    OrganisationComponent,
    OrganisationTabelComponent,
    OrganisationDetailComponent,
    OrganisationEditComponent,
    OrganisationListComponent,
    ApiKeyComponent,
    ApiKeyListComponent,
    ApiKeyTableComponent,
    ApiKeyEditComponent,
    AwaitingUsersTableComponent,
    AcceptUserComponent,
  ],
  imports: [
    AdminRoutingModule,
    NGMaterialModule,
    PipesModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    RouterModule,
    ApplicationsModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSelectSearchModule,
  ],
  exports: [
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    UsersComponent,
    UserTableComponent,
    PermissionComponent,
    PermissionEditComponent,
    PermissionDetailComponent,
    PermissionListComponent,
    PermissionTabelComponent,
    OrganisationComponent,
    OrganisationTabelComponent,
    OrganisationDetailComponent,
    OrganisationEditComponent,
    OrganisationListComponent,
    ApiKeyComponent,
    ApiKeyListComponent,
    ApiKeyTableComponent,
    ApiKeyEditComponent,
  ],
})
export class AdminModule {}
