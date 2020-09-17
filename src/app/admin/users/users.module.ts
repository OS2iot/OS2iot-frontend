import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserTabelComponent } from './user-tabel/user-tabel.component';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [UserDetailComponent, UserEditComponent, UserTabelComponent, UsersComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
