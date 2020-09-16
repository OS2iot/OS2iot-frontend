import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrganisationTabelComponent } from './organisation-tabel/organisation-tabel.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';




@NgModule({
  declarations: [OrganizationComponent, OrganisationTabelComponent, OrganisationDetailComponent, OrganisationEditComponent],
  imports: [
    CommonModule
  ]
})
export class OrganizationModule { }
