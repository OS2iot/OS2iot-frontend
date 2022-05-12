import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent },
    { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule), canActivate: [AuthGuard] },
    { path: 'gateways', loadChildren: () => import('./gateway/gateway.module').then(m => m.GatewayModule), canActivate: [AuthGuard] },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule), canActivate: [AuthGuard] },
    { path: 'payload-decoder', loadChildren: () => import('./payload-decoder/payload-decoder.module').then(m => m.PayloadDecoderModule), canActivate: [AuthGuard] },
    { path: 'sigfox', loadChildren: () => import('./sigfox/sigfox.module').then(m => m.SigfoxModule), canActivate: [AuthGuard] },
    { path: 'device-model', loadChildren: () => import('./device-model/device-model.module').then(m => m.DeviceModelModule), canActivate: [AuthGuard] },
    { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'not-found', code: 404 } },
    { path: 'not-authorized', component: ErrorPageComponent },
    { path: '', redirectTo: '/applications', pathMatch: 'full' },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
