import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceProfilesEditComponent } from './service-profiles/service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesDetailComponent } from './service-profiles/service-profiles-detail/service-profiles-detail.component';
import { ServiceProfileResolverService } from './service-profiles/service-profile-resolver.service';
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';


const profilesRoutes: Routes = [
    {
        path: '',
        component: ProfilesComponent,
        children: [
            { path: '', component: ProfilesListComponent },
            { path: 'new-profile', component: ServiceProfilesEditComponent },
            {
                path: ':id',
                component: ServiceProfilesDetailComponent,
                resolve: [ServiceProfileResolverService]
            },
            {
                path: ':id/edit-profile',
                component: ServiceProfilesEditComponent,
                resolve: [ServiceProfileResolverService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(profilesRoutes)],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }
