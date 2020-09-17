import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationTabelComponent } from './organisation-tabel/organisation-tabel.component';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';
import { OrganisationComponent } from './organisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/form/form.module';
import { TopBarModule } from '@shared/top-bar/top-bar.module';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationRowComponent } from './organisation-tabel/organisation-row/organisation-row.component';
import { MyApplicationsModule } from '../../my-applications/my-applications.module';

@NgModule({
  declarations: [
    OrganisationComponent,
    OrganisationTabelComponent,
    OrganisationDetailComponent,
    OrganisationEditComponent,
    OrganisationRowComponent,
    OrganisationListComponent,
  ],
  exports: [
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
    RouterModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    MyApplicationsModule
  ],
})
export class OrganisationModule {}
