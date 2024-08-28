import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigfoxRoutingModule } from "./sigfox-routing.module";
import { FormModule } from "@shared/components/forms/form.module";
import { FormsModule } from "@angular/forms";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "@shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SigfoxGroupsEditComponent } from "./sigfox-groups-edit/sigfox-groups-edit.component";
import { SigfoxGroupsListComponent } from "./sigfox-groups-list/sigfox-groups-list.component";
import { SigfoxGroupsDetailComponent } from "./sigfox-groups-detail/sigfox-groups-detail.component";
import { SigfoxDeviceTypeTableComponent } from "./sigfox-groups-detail/sigfox-device-type-table/sigfox-device-type-table.component";
import { SigfoxDeviceTypesEditComponent } from "./sigfox-groups-detail/sigfox-device-types-edit/sigfox-device-types-edit.component";
import { SigfoxGroupsListItemComponent } from "./sigfox-groups-list/sigfox-groups-list-item/sigfox-groups-list-item.component";
import { PipesModule } from "@shared/pipes/pipes.module";

@NgModule({
  declarations: [
    SigfoxGroupsEditComponent,
    SigfoxDeviceTypesEditComponent,
    SigfoxDeviceTypeTableComponent,
    SigfoxGroupsListComponent,
    SigfoxGroupsDetailComponent,
    SigfoxGroupsListItemComponent,
  ],
  imports: [
    CommonModule,
    SigfoxRoutingModule,
    FormsModule,
    FormModule,
    NGMaterialModule,
    TranslateModule,
    SharedModule,
    FontAwesomeModule,
    PipesModule,
  ],
})
export class SigfoxModule {}
