import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GatewaysComponent } from './gateway/gateways/gateways.component';
import { GatewayEditComponent } from './gateway/gateway-edit/gateway-edit.component';
import { GatewayListComponent } from './gateway/gateway-list/gateway-list.component';
import { GatewayDetailComponent } from './gateway/gateway-detail/gateway-detail.component';

const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule) },
    {
        path: 'gateways', component: GatewaysComponent,
        children: [
            { path: '', component: GatewayListComponent },
            { path: 'gateway-edit/:id', component: GatewayEditComponent },
            { path: 'gateway-edit', component: GatewayEditComponent },
            { path: 'gateway-detail/:id', component: GatewayDetailComponent }
        ],
    },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: 'payload-decoder', loadChildren: () => import('./payload-decoder/payload-decoder.module').then(m => m.PayloadDecoderModule) },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
