import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrganisationComponent } from './organisation/organisation.component';
import { OrganisationDetailComponent } from './organisation/organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation/organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';


const adminRoutes: Routes = [

    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    // { path: 'users', component: UsersComponent },

    {
        path: 'organisations', component: OrganisationComponent, children: [
            { path: '', component: OrganisationListComponent },
            { path: 'new-organisation', component: OrganisationEditComponent },
            { path: ':orgId', component: OrganisationDetailComponent },
            { path: ':orgId/edit-organisation', component: OrganisationEditComponent },
        ]
    },
    { path: 'permissions', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) },
    

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
