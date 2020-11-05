import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceModelListComponent } from './device-model-list/device-model-list.component';
import { DeviceModelEditComponent } from './device-model-edit/device-model-edit.component';
import { DeviceModelDetailComponent } from './device-model-detail/device-model-detail.component';
import { DeviceModelTableComponent } from './device-model-table/device-model-table.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: DeviceModelListComponent },
            { path: 'device-model-edit', component: DeviceModelEditComponent },
            { path: 'device-model-edit/:deviceId', component: DeviceModelEditComponent },
            { path: 'device-model-detail/:deviceId', component: DeviceModelDetailComponent  }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceModelRoutingModule { }
