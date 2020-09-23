import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './user-list/user-table/user-table.component';
import { TopBarModule } from '@shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserTableRowComponent } from './user-list/user-table/user-table-row/user-table-row.component';
import { FormModule } from '@shared/form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { PermissionModule } from '../permission/permission.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UserDetailComponent, UserEditComponent, UserListComponent, UsersComponent, UserTableComponent, UserTableRowComponent],
  imports: [
    NGMaterialModule,
    PipesModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    RouterModule,
    PermissionModule,
  ],
})
export class UsersModule { }
