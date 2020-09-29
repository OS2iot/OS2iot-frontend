import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsModule } from '@app/applications/applications.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationRowComponent } from './organisation-list/organisation-tabel/organisation-row/organisation-row.component';
import { OrganisationTabelComponent } from './organisation-list/organisation-tabel/organisation-tabel.component';
import { OrganisationComponent } from './organisation.component';


@NgModule({
  declarations: [
    OrganisationComponent,
    OrganisationTabelComponent,
    OrganisationDetailComponent,
    OrganisationEditComponent,
    OrganisationRowComponent,
    OrganisationListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    ApplicationsModule,
  ],
})
export class OrganisationModule { }
