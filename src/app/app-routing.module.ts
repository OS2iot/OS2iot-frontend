import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MineLoraGatewaysComponent } from './views/administration-gateway/mine-lora-gateways/mine-lora-gateways.component';
import { ListLoraGatewayComponent } from './views/administration-gateway/list-lora-gateway/list-lora-gateway.component';
import { EditGatewayComponent } from './views/administration-gateway/edit-gateway/edit-gateway.component';
import { GatewayComponent } from './views/administration-gateway/gateway/gateway.component';
import { DatatargetListComponent } from './views/datatarget/datatarget-list/datatarget-list.component';
import { DatatargetEditComponent } from './views/datatarget/datatarget-edit/datatarget-edit.component';
import { DatatargetComponent } from './views/datatarget/datatarget/datatarget.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { AlleIotEnhederComponent } from './views/alle-iot-enheder/alle-iot-enheder/alle-iot-enheder.component';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { PayloadDecoderComponent } from './payload-decoder/payload-decoder/payload-decoder.component';

const routes: Routes = [

    { path: 'my-applications', loadChildren: () => import('./my-applications/my-applications.module').then(m => m.MyApplicationsModule) },

    {
        path: 'mine-lora-gateways', component: MineLoraGatewaysComponent,
        children: [
            { path: '', component: ListLoraGatewayComponent },
            { path: 'edit-gateway/:id', component: EditGatewayComponent },
            { path: 'edit-gateway', component: EditGatewayComponent },
            { path: 'gateway/:id', component: GatewayComponent }
        ],

    },
    { path: 'datatarget', component: DatatargetListComponent },
    { path: 'iot-devices', component: AlleIotEnhederComponent },
    { path: 'payload-decoder', component: PayloadDecoderComponent },
    { path: 'profiles', loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule) },
    { path: '', redirectTo: '/my-applications', pathMatch: 'full' },
    { path: '**', redirectTo: '/my-applications', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
