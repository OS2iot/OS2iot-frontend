import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigfoxProfilesComponent } from './sigfox-profiles/sigfox-profiles.component';
import { SigfoxAdministrationComponent } from './sigfox-administration/sigfox-administration.component';
import { SigfoxRoutingModule } from './sigfox-routing.module';
import { SigfoxAdministrationEditComponent } from './sigfox-administration/sigfox-administration-edit/sigfox-administration-edit.component';
import { SigfoxProfilesListComponent } from './sigfox-profiles/sigfox-profiles-list/sigfox-profiles-list.component';
import { SigfoxProfilesEditComponent } from './sigfox-profiles/sigfox-profiles-edit/sigfox-profiles-edit.component';
import { SigfoxAdministrationItemComponent } from './sigfox-administration/sigfox-administration-list/sigfox-administration-item/sigfox-administration-item.component';
import { FormModule } from '@shared/components/forms/form.module';
import { FormsModule } from '@angular/forms';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { TranslateModule } from '@ngx-translate/core';
import { SigfoxAdministrationListComponent } from './sigfox-administration/sigfox-administration-list/sigfox-administration-list.component';
import { SigfoxAdministrationTableComponent } from './sigfox-profiles/sigfox-administration-table/sigfox-administration-table.component';
import { SigfoxAdministrationRowComponent } from './sigfox-profiles/sigfox-administration-table/sigfox-administration-row/sigfox-administration-row.component';

@NgModule({
  declarations: [
    SigfoxProfilesComponent,
    SigfoxAdministrationComponent,
    SigfoxAdministrationEditComponent,
    SigfoxProfilesListComponent,
    SigfoxProfilesEditComponent,
    SigfoxAdministrationItemComponent,
    SigfoxAdministrationListComponent,
    SigfoxAdministrationTableComponent,
    SigfoxAdministrationRowComponent],
  imports: [
    CommonModule,
    SigfoxRoutingModule,
    FormsModule,
    FormModule,
    TopBarModule,
    NGMaterialModule,
    TranslateModule
  ]
})
export class SigfoxModule { }
