import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigfoxRoutingModule } from './sigfox-routing.module';
import { FormModule } from '@shared/components/forms/form.module';
import { FormsModule } from '@angular/forms';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SigfoxGroupsEditComponent } from './sigfox-groups-edit/sigfox-groups-edit.component';
import { SigfoxDeviceTypesComponent } from './sigfox-device-types/sigfox-device-types.component';
import { SigfoxDeviceTypesEditComponent } from './sigfox-device-types-edit/sigfox-device-types-edit.component';
import { SigfoxDeviceTypeTableComponent } from './sigfox-device-types/sigfox-device-type-table/sigfox-device-type-table.component';
import { SigfoxGroupsComponent } from './sigfox-groups/sigfox-groups.component';

@NgModule({
  declarations: [
    SigfoxGroupsEditComponent,
    SigfoxDeviceTypesComponent,
    SigfoxDeviceTypesEditComponent,
    SigfoxDeviceTypeTableComponent,
    SigfoxGroupsComponent
  ],
  imports: [
    CommonModule,
    SigfoxRoutingModule,
    FormsModule,
    FormModule,
    TopBarModule,
    NGMaterialModule,
    TranslateModule,
    SharedModule,
    FontAwesomeModule,
  ]
})
export class SigfoxModule { }
