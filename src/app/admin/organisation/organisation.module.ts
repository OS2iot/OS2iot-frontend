import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MyApplicationsModule } from '@my-applications/my-applications.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/form/form.module';
import { TopBarModule } from '@shared/top-bar/top-bar.module';
import { OrganisationDetailComponent } from './organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationRowComponent } from './organisation-list/organisation-tabel/organisation-row/organisation-row.component';
import { OrganisationTabelComponent } from './organisation-list/organisation-tabel/organisation-tabel.component';
import { OrganisationComponent } from './organisation.component';

const organisationRoutes: Routes = [
  {
    path: '', component: OrganisationComponent, children: [
      { path: '', component: OrganisationListComponent },
      { path: 'new-organisation', component: OrganisationEditComponent },
      { path: ':org-id', component: OrganisationDetailComponent },
      { path: ':org-id/edit-organisation', component: OrganisationEditComponent },
    ]
  },

];

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
    RouterModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
    RouterModule.forChild(organisationRoutes),
    MyApplicationsModule,
  ],
  exports: [
    RouterModule
  ],
})
export class OrganisationModule { }
