import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationsComponent } from './applications.component';
import { IoTDeviceDetailComponent } from './iot-devices/iot-device-detail/iot-device-detail.component';
import { IotDeviceEditComponent } from './iot-devices/iot-device-edit/iot-device-edit.component';
import { DatatargetEditComponent } from './datatarget/datatarget-edit/datatarget-edit.component';
import { DatatargetListComponent } from './datatarget/datatarget-list/datatarget-list.component';
import { DatatargetDetailComponent } from './datatarget/datatarget-detail/datatarget-detail.component';
import { BulkImportComponent } from './bulk-import/bulk-import.component';
import { MulticastListComponent } from './multicast/multicast-list/multicast-list.component';
import { MulticastEditComponent } from './multicast/multicast-edit/multicast-edit.component';
import { MulticastDetailComponent } from './multicast/multicast-detail/multicast-detail.component';


const applicationRoutes: Routes = [
    {
        path: '',
        component: ApplicationsComponent,
        children: [
            { path: '', component: ApplicationsListComponent },
            { path: 'new-application', component: ApplicationEditComponent, },
            { path: 'edit-application/:id', component: ApplicationEditComponent, },
            {
                path: ':id',
                children: [
                    { path: '', component: ApplicationDetailComponent },
                    { path: 'new-iot-device', component: IotDeviceEditComponent, },
                    { path: 'iot-device-edit/:deviceId', component: IotDeviceEditComponent, },
                    { path: 'iot-device/:deviceId', component: IoTDeviceDetailComponent, },
                    {
                        path: 'datatarget-list/:name',
                        children: [
                            { path: '', component: DatatargetListComponent },
                            { path: 'datatarget-edit', component: DatatargetEditComponent },
                            { path: 'datatarget-edit/:datatargetId', component: DatatargetEditComponent },
                            { path: 'datatarget/:datatargetId', component: DatatargetDetailComponent }
                        ]

                    },
                    {
                        path: 'multicast-list/:name',
                        children: [
                            { path: '', component: MulticastListComponent },
                            { path: 'multicast-edit', component: MulticastEditComponent},
                            { path: 'multicast-edit/:multicastId', component: MulticastEditComponent },
                            { path: 'multicast/:multicastId', component: MulticastDetailComponent }
                        ]
                    },
                    { path: 'bulk-import', component: BulkImportComponent },
                ],
            },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(applicationRoutes)],
    exports: [RouterModule]
})
export class ApplicaitonsRoutingModule { }
