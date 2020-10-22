import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ApplicationsModule } from '@applications/applications.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
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
import { UserTableRowComponent } from './users/user-list/user-table/user-table-row/user-table-row.component';
import { UserTableComponent } from './users/user-list/user-table/user-table.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    UsersComponent,
    UserTableComponent,
    UserTableRowComponent,
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
  ],
  imports: [
    AdminRoutingModule,
    NGMaterialModule,
    PipesModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    RouterModule,
    ApplicationsModule,
    SharedModule,
  ],
  exports: [
    UserDetailComponent,
    UserEditComponent,
    UserListComponent,
    UsersComponent,
    UserTableComponent,
    UserTableRowComponent,
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
  ]
})
export class AdminModule { }
