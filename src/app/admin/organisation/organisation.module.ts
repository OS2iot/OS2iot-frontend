import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationTabelComponent } from './organisation-tabel/organisation-tabel.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';
import { OrganisationComponent } from './organisation.component';




@NgModule({
  declarations: [OrganisationComponent, OrganisationTabelComponent, OrganisationDetailComponent, OrganisationEditComponent],
  imports: [
    CommonModule
  ]
})
export class OrganisationModule { }
