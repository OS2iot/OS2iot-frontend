import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const adminRoutes: Routes = [

    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: 'organisations', loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule) },
    { path: 'permissions', loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule) },


];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
