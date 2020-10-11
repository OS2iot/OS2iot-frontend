import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SigfoxGroupsEditComponent } from './sigfox-groups-edit/sigfox-groups-edit.component';
import { SigfoxGroupsListComponent } from './sigfox-groups-list/sigfox-groups-list.component';
import { SigfoxGroupsDetailComponent } from './sigfox-groups-detail/sigfox-groups-detail.component';
import { SigfoxDeviceTypesEditComponent } from './sigfox-groups-detail/sigfox-device-types-edit/sigfox-device-types-edit.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SigfoxGroupsListComponent },
            { path: 'new', component: SigfoxGroupsEditComponent },
            { path: ':id/edit-group', component: SigfoxGroupsEditComponent },
            {
                path: ':id', children: [
                    { path: '', component: SigfoxGroupsDetailComponent },
                    { path: ':id/edit-device-type', component: SigfoxDeviceTypesEditComponent },
                    { path: 'edit-device-type', component: SigfoxDeviceTypesEditComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigfoxRoutingModule { }
