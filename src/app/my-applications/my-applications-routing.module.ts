import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { ApplicationComponent } from './application/application.component';
import { IotDeviceEditComponent } from './iot-devices/iot-device-edit/iot-device-edit.component';
import { IoTDeviceDetailComponent } from './iot-devices/iot-device-detail/iot-device-detail.component';
import { DatatargetListComponent } from '../views/datatarget/datatarget-list/datatarget-list.component';
import { DatatargetEditComponent } from '../views/datatarget/datatarget-edit/datatarget-edit.component';
import { DatatargetComponent } from '../views/datatarget/datatarget/datatarget.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { MyApplicationsComponent } from './my-applications.component';


const myApplicationRoutes: Routes = [
    {
        path: '',
        component: MyApplicationsComponent,
        children: [
            { path: '', component: ListApplicationsComponent },
            { path: 'new-application', component: EditApplicationComponent, },
            { path: ':id/edit-application', component: EditApplicationComponent, },
            {
                path: ':id',
                children: [
                    { path: '', component: ApplicationComponent },
                    { path: 'new-iot-device', component: IotDeviceEditComponent, },
                    { path: 'iot-device-edit/:deviceId', component: IotDeviceEditComponent, },
                    { path: 'iot-device/:deviceId', component: IoTDeviceDetailComponent, },
                    {
                        path: 'datatarget-list/:name',
                        children: [
                            { path: '', component: DatatargetListComponent },
                            { path: 'datatarget-edit', component: DatatargetEditComponent },
                            { path: 'datatarget-edit/:datatargetId', component: DatatargetEditComponent },
                            { path: 'datatarget/:datatargetId', component: DatatargetComponent }
                        ]

                    }
                ],
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(myApplicationRoutes)],
    exports: [RouterModule]
})
export class MyApplicaitonsRoutingModule { }
