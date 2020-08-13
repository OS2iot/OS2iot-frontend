import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { MineApplikationerComponent } from './views/mine-applikationer/mine-applikationer/mine-applikationer.component';
import { CreateApplicationComponent } from './views/mine-applikationer/create-application/create-application.component';
import { EditApplicationComponent } from './views/mine-applikationer/edit-application/edit-application.component';
import { ListApplicationsComponent } from './views/mine-applikationer/list-applications/list-applications.component';
import { ApplicationComponent } from './views/mine-applikationer/application/application.component';
import { CreateIotDevicesComponent } from './views/alle-iot-enheder/create-iot-devices/create-iot-devices.component';
import { IoTDeviceComponent } from './views/alle-iot-enheder/iot-device/iot-device.component';

const routes: Routes = [
    { path: 'home', component: DashboardComponent },
    {
        path: 'mine-applikationer',
        component: MineApplikationerComponent,
        children: [
            { path: '', component: ListApplicationsComponent },
            {
                path: 'application/:id',
                children: [
                    { path: '', component: ApplicationComponent },
                    {
                        path: 'create-iot-device',
                        component: CreateIotDevicesComponent,
                    },
                    {
                        path: 'iot-device/:deviceId',
                        component: IoTDeviceComponent,
                    },
                ],
            },
            {
                path: 'create-application',
                component: CreateApplicationComponent,
            },
            {
                path: 'edit-application/:id',
                component: EditApplicationComponent,
            },
        ],
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
