import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProfilesEditComponent } from './service-profiles/service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesDetailComponent } from './service-profiles/service-profiles-detail/service-profiles-detail.component';
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { DeviceProfilesDetailComponent } from './device-profiles/device-profiles-detail/device-profiles-detail.component';
import { DeviceProfilesEditComponent } from './device-profiles/device-profiles-edit/device-profiles-edit.component';


const profilesRoutes: Routes = [
    {
        path: '', component: ProfilesComponent,
        children: [
            { path: '', component: ProfilesListComponent },
            { path: 'new-service-profile', component: ServiceProfilesEditComponent },
            { path: 'detail/:serviceId', component: ServiceProfilesDetailComponent },
            { path: ':serviceId/edit-service-profile', component: ServiceProfilesEditComponent },
            { path: 'new-device-profile', component: DeviceProfilesEditComponent },
            { path: ':deviceId', component: DeviceProfilesDetailComponent },
            { path: ':deviceId/edit-device-profile', component: DeviceProfilesEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profilesRoutes)],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }
