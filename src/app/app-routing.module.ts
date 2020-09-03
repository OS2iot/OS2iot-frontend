import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { EditApplicationComponent } from './my-applications/edit-application/edit-application.component';
import { ListApplicationsComponent } from './my-applications/list-applications/list-applications.component';
import { ApplicationComponent } from './my-applications/application/application.component';
import { IoTDeviceComponent } from './views/alle-iot-enheder/iot-device/iot-device.component';
import { EditIotDeviceComponent } from './views/alle-iot-enheder/edit-iot-device/edit-iot-device.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AlleIotEnhederComponent } from './views/alle-iot-enheder/alle-iot-enheder/alle-iot-enheder.component';

const routes: Routes = [
    { path: 'home', component: DashboardComponent },
    {
        path: 'my-applications',
        component: MyApplicationsComponent,
        children: [
            { path: '', component: ListApplicationsComponent },
            {
                path: 'application/:id',
                children: [
                    { path: '', component: ApplicationComponent },
                    {
                        path: 'edit-iot-device',
                        component: EditIotDeviceComponent,
                    },
                    {
                        path: 'edit-iot-device/:deviceId',
                        component: EditIotDeviceComponent,
                    },
                    {
                        path: 'iot-device/:deviceId',
                        component: IoTDeviceComponent,
                    },
                ],
            },
            {
                path: 'edit-application',
                component: EditApplicationComponent,
            },
            {
                path: 'edit-application/:id',
                component: EditApplicationComponent,
            },
        ],
    },
    { path: 'iot-devices', component: AlleIotEnhederComponent },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
