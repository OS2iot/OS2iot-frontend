import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganisationEditComponent } from './organization/organisation-edit/organisation-edit.component';
import { AdminStartComponent } from './admin-start/admin-start.component';
import { OrganisationDetailComponent } from './organization/organisation-detail/organisation-detail.component';
import { OrganisationTabelComponent } from './organization/organisation-tabel/organisation-tabel.component';
import { AdminComponent } from './admin.component';


const adminRoutes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', component: AdminStartComponent },
            { path: 'new-organisation', component: OrganisationEditComponent },
            { path: 'organisation', component: OrganisationTabelComponent },
            { path: ':orgId', component: OrganisationDetailComponent },
            { path: ':orgId/edit-organisation', component: OrganisationEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
