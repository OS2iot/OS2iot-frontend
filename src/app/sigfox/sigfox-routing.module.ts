import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigfoxAdministrationComponent } from './sigfox-administration/sigfox-administration.component';
import { SigfoxProfilesComponent } from './sigfox-profiles/sigfox-profiles.component';
import { SigfoxProfilesEditComponent } from './sigfox-profiles/sigfox-profiles-edit/sigfox-profiles-edit.component';
import { SigfoxAdministrationListComponent } from './sigfox-administration/sigfox-administration-list/sigfox-administration-list.component';

const routes: Routes = [
    { path: 'administration', component: SigfoxAdministrationComponent,
        children: [
            {path: '', component: SigfoxAdministrationListComponent},
            {path: ':id', component: SigfoxProfilesEditComponent},
            {path: 'edit', component: SigfoxProfilesEditComponent}
        ]
    },
    { path: 'profiles', component: SigfoxProfilesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigfoxRoutingModule { }
