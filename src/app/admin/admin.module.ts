import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsergroupsModule } from './usergroups/usergroups.module';
import { UsersModule } from './users/users.module';
import { OrganisationModule } from './organisation/organisation.module';



@NgModule({
  declarations: [],
  imports: [
    AdminRoutingModule,
    UsergroupsModule,
    OrganisationModule,
    UsersModule,
    CommonModule
  ]
})
export class AdminModule { }
