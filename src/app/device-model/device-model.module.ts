import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeviceModelListComponent } from "./device-model-list/device-model-list.component";
import { DeviceModelRoutingModule } from "./device-model-routing.module";
import { DeviceModelTableComponent } from "./device-model-table/device-model-table.component";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { TranslateModule } from "@ngx-translate/core";
import { DeviceModelDetailComponent } from "./device-model-detail/device-model-detail.component";
import { DeviceModelEditComponent } from "./device-model-edit/device-model-edit.component";
import { SharedModule } from "@shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormModule } from "@shared/components/forms/form.module";
import { PipesModule } from "@shared/pipes/pipes.module";

@NgModule({
  declarations: [
    DeviceModelListComponent,
    DeviceModelTableComponent,
    DeviceModelDetailComponent,
    DeviceModelEditComponent,
  ],
  imports: [
    CommonModule,
    DeviceModelRoutingModule,
    NGMaterialModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class DeviceModelModule {}
