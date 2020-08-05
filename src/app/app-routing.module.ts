import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { MineApplikationerComponent } from './views/mine-applikationer/mine-applikationer/mine-applikationer.component';
import { CreateApplicationComponent } from './views/mine-applikationer/create-application/create-application.component';
import { EditApplicationComponent } from './views/mine-applikationer/edit-application/edit-application.component';
import { ListApplicationsComponent } from './views/mine-applikationer/list-applications/list-applications.component';
import { ApplicationComponent } from './views/mine-applikationer/application/application.component';
import { CreateIoTDeviceComponent } from './views/iot-device/create-iot-device/create-iot-device.component';

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
                        component: CreateIoTDeviceComponent,
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
