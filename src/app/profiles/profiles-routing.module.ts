import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProfilesEditComponent } from './service-profiles/service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesDetailComponent } from './service-profiles/service-profiles-detail/service-profiles-detail.component';
import { ServiceProfilesResolverService } from './service-profiles/service-profile-resolver.service';
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { DeviceProfilesDetailComponent } from './device-profiles/device-profiles-detail/device-profiles-detail.component';
import { DeviceProfilesResolverService } from './device-profiles/device-profiles-resolver.service';
import { DeviceProfilesEditComponent } from './device-profiles/device-profiles-edit/device-profiles-edit.component';


const profilesRoutes: Routes = [
    {
        path: '',
        component: ProfilesComponent,
        children: [
            { path: '', component: ProfilesListComponent },
            { path: 'new-service-profile', component: ServiceProfilesEditComponent },
            {
                path: ':serviceId',
                component: ServiceProfilesDetailComponent,
                resolve: [ServiceProfilesResolverService]
            },
            {
                path: ':serviceId/edit-service-profile',
                component: ServiceProfilesEditComponent,
                resolve: [ServiceProfilesResolverService]
            },
            { path: 'new-device-profile', component: DeviceProfilesEditComponent },
            {
                path: ':deviceId',
                component: DeviceProfilesDetailComponent,
                resolve: [DeviceProfilesResolverService]
            },
            {
                path: ':deviceId/edit-device-profile',
                component: DeviceProfilesEditComponent,
                resolve: [DeviceProfilesResolverService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profilesRoutes)],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }
