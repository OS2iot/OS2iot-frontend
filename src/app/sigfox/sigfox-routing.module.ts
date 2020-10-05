import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { SigfoxAdministrationComponent } from './sigfox-administration/sigfox-administration.component';
import { SigfoxProfilesComponent } from './sigfox-profiles/sigfox-profiles.component';
import { SigfoxProfilesEditComponent } from './sigfox-profiles/sigfox-profiles-edit/sigfox-profiles-edit.component';
import { SigfoxAdministrationListComponent } from './sigfox-administration/sigfox-administration-list/sigfox-administration-list.component';
import { SigfoxProfilesListComponent } from './sigfox-profiles/sigfox-profiles-list/sigfox-profiles-list.component';
import { SigfoxAdministrationEditComponent } from './sigfox-administration/sigfox-administration-edit/sigfox-administration-edit.component';

const routes: Routes = [
    {
        path: 'administration', component: SigfoxAdministrationComponent,
        children: [
            { path: '', component: SigfoxAdministrationListComponent },
            { path: ':id', component: SigfoxAdministrationEditComponent },
            { path: 'edit', component: SigfoxAdministrationEditComponent }
        ]
    },
    {
        path: 'profiles', component: SigfoxProfilesComponent,
        children: [
            { path: '', component: SigfoxProfilesListComponent },
            { path: ':id', component: SigfoxProfilesEditComponent },
            { path: 'edit', component: SigfoxProfilesEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SigfoxRoutingModule { }
