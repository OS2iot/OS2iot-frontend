import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsergroupTabelComponent } from './usergroup-tabel/usergroup-tabel.component';
import { UsergroupDetailComponent } from './usergroup-detail/usergroup-detail.component';
import { UsergroupEditComponent } from './usergroup-edit/usergroup-edit.component';
import { UsergroupsComponent } from './usergroups.component';



@NgModule({
  declarations: [UsergroupTabelComponent, UsergroupDetailComponent, UsergroupEditComponent, UsergroupsComponent],
  imports: [
    CommonModule
  ]
})
export class UsergroupsModule { }
