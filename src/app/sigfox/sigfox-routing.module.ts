import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigfoxAdministrationComponent } from './sigfox-administration/sigfox-administration.component';
import { SigfoxProfilesComponent } from './sigfox-profiles/sigfox-profiles.component';

const routes: Routes = [
    { path: 'sigfox-administration', component: SigfoxAdministrationComponent },
    { path: 'sigfox-profiles', component: SigfoxProfilesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigfoxRoutingModule { }
