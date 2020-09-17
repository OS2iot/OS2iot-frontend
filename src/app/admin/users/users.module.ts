import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { UserTableComponent } from './user-list/user-table/user-table.component';
import { TopBarModule } from '@shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableRowComponent } from './user-list/user-table/user-table-row/user-table-row.component';
import { FormModule } from '@shared/form/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';

const userRoutes: Routes = [

  {
    path: '', component: UsersComponent, children: [
      { path: '', component: UserListComponent },
      { path: 'new-user', component: UserEditComponent },
      { path: ':user-id', component: UserDetailComponent },
      { path: ':user-id/edit-user', component: UserEditComponent },
    ]
  },

];

@NgModule({
  declarations: [UserDetailComponent, UserEditComponent, UserListComponent, UsersComponent, UserTableComponent, UserTableRowComponent],
  imports: [
    PipesModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    RouterModule.forChild(userRoutes),
  ],
  exports: [RouterModule]
})
export class UsersModule { }
