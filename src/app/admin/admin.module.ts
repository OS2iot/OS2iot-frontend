import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationModule } from './organization/organization.module';
import { AdminComponent } from './admin.component';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [AdminComponent, AdminStartComponent],
  imports: [
    AdminRoutingModule,
    OrganizationModule,
    CommonModule
  ]
})
export class AdminModule { }
