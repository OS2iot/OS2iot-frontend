import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganisationDetailComponent } from './organisation/organisation-detail/organisation-detail.component';
import { OrganisationEditComponent } from './organisation/organisation-edit/organisation-edit.component';
import { OrganisationListComponent } from './organisation/organisation-list/organisation-list.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { PermissionDetailComponent } from './permission/permission-detail/permission-detail.component';
import { PermissionEditComponent } from './permission/permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionComponent } from './permission/permission.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';


const adminRoutes: Routes = [

    // { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },

    {
        path: 'organisations', component: OrganisationComponent, children: [
            { path: '', component: OrganisationListComponent },
            { path: 'new-organisation', component: OrganisationEditComponent },
            { path: ':org-id', component: OrganisationDetailComponent },
            { path: ':org-id/edit-organisation', component: OrganisationEditComponent },
        ]
    },
    // { path: 'organisations', loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule) },
    // { path: 'permissions', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) },
    {
        path: 'users', component: UsersComponent, children: [
            { path: '', component: UserListComponent },
            { path: 'new-user', component: UserEditComponent },
            { path: ':user-id', component: UserDetailComponent },
            { path: ':user-id/edit-user', component: UserEditComponent },
        ]
    },
    {
        path: 'permissions',
        component: PermissionComponent,
        children: [
            { path: '', component: PermissionListComponent },
            { path: 'new-permission', component: PermissionEditComponent },
            { path: ':permission-id', component: PermissionDetailComponent },
            {
                path: ':permission-id/edit-permission',
                component: PermissionEditComponent,
            },
        ],
    },


];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
