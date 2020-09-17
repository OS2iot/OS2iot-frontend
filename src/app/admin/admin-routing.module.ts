import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrganisationComponent } from './organisation/organisation.component';
import { UsersComponent } from './users/users.component';
import { OrganisationDetailComponent } from './organisation/organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation/organisation-edit/organisation-edit.component';
import { OrganisationTabelComponent } from './organisation/organisation-tabel/organisation-tabel.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { UsergroupEditComponent } from './usergroups/usergroup-edit/usergroup-edit.component';
import { UsergroupDetailComponent } from './usergroups/usergroup-detail/usergroup-detail.component';
import { UsergroupTabelComponent } from './usergroups/usergroup-tabel/usergroup-tabel.component';


const adminRoutes: Routes = [

    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    // { path: 'users', component: UsersComponent },

    {
        path: 'organisations', component: OrganisationComponent, children: [
            { path: '', component: OrganisationTabelComponent },
            { path: 'new-organisation', component: OrganisationEditComponent },
            { path: ':orgId', component: OrganisationDetailComponent },
            { path: ':orgId/edit-organisation', component: OrganisationEditComponent },
        ]
    },
    {
        path: 'usergroups', component: UsergroupsComponent, children: [
            { path: '', component: UsergroupTabelComponent },
            { path: 'new-user', component: UsergroupEditComponent },
            { path: ':user-id', component: UsergroupDetailComponent },
            { path: ':user-id/edit-user', component: UsergroupEditComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
