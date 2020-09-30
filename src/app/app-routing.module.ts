import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule) },
    { path: 'gateways', loadChildren: () => import('./gateway/gateway.module').then(m => m.GatewayModule) },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: 'payload-decoder', loadChildren: () => import('./payload-decoder/payload-decoder.module').then(m => m.PayloadDecoderModule) },
    { path: 'sigfox', loadChildren: () => import('./sigfox/sigfox.module').then(m => m.SigfoxModule) },
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
