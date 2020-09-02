import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from '../profiles.component';
import { ServiceProfilesStartComponent } from './service-profiles-start/service-profiles-start.component';
import { ServiceProfilesEditComponent } from './service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesDetailComponent } from './service-profiles-detail/service-profiles-detail.component';
import { ServiceProfilesResolverService } from './service-profile-resolver.service';
import { ServiceProfilesComponent } from './service-profiles.component';


const routes: Routes = [
    {
        path: '',
        component: ServiceProfilesComponent,
        children: [
            { path: '', component: ServiceProfilesStartComponent },
            { path: 'new', component: ServiceProfilesEditComponent },
            {
                path: ':id',
                component: ServiceProfilesDetailComponent,
                resolve: [ServiceProfilesResolverService]
            },
            {
                path: ':id/edit',
                component: ServiceProfilesEditComponent,
                resolve: [ServiceProfilesResolverService]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfilesRoutingModule { }