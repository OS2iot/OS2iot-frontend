import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { MineApplikationerComponent } from './views/mine-applikationer/mine-applikationer/mine-applikationer.component';
import { AlleIotEnhederComponent } from './views/alle-iot-enheder/alle-iot-enheder/alle-iot-enheder.component';


const routes: Routes = [
    { path: 'home', component: DashboardComponent},
    { path: 'mine-applikationer', component: MineApplikationerComponent},
    { path: 'alle-iot-enheder', component: AlleIotEnhederComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
