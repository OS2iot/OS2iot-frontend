import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SigfoxDeviceTypesEditComponent } from './sigfox-device-types-edit/sigfox-device-types-edit.component';
import { SigfoxDeviceTypesComponent } from './sigfox-device-types/sigfox-device-types.component';
import { SigfoxGroupsEditComponent } from './sigfox-groups-edit/sigfox-groups-edit.component';
import { SigfoxGroupsComponent } from './sigfox-groups/sigfox-groups.component';

const routes: Routes = [
    {
        path: 'sigfox-groups',
        children: [
            { path: '', component: SigfoxGroupsComponent },
            { path: 'new', component: SigfoxGroupsEditComponent },
            { path: ':id/edit', component: SigfoxGroupsEditComponent },
            {
                path: ':id', children: [
                    { path: '', component: SigfoxDeviceTypesComponent },
                    { path: ':id/edit', component: SigfoxDeviceTypesEditComponent },
                    { path: 'edit', component: SigfoxDeviceTypesEditComponent }
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
