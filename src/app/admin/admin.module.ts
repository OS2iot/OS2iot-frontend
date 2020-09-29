import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsersModule } from './users/users.module';
import { OrganisationModule } from './organisation/organisation.module';
import { PermissionModule } from './permission/permission.module';



@NgModule({
  declarations: [],
  imports: [
    AdminRoutingModule,
    PermissionModule,
    OrganisationModule,
    UsersModule,
    CommonModule
  ]
})
export class AdminModule { }
