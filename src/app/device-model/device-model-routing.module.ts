import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceModelListComponent } from './device-model-list/device-model-list.component';

const routes: Routes = [
    {
        path: '', component: DeviceModelListComponent,
        /* children: [
            { path: '', component: PayloadDecoderListComponent },
            { path: 'payload-decoder-edit', component: PayloadDecoderEditComponent },
            { path: 'payload-decoder-edit/:id', component: PayloadDecoderEditComponent },
            { path: 'payload-decoder-detail/:id', component: PayloadDecoderDetailComponent }
        ] */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceModelRoutingModule { }
