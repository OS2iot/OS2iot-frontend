import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { PayloadDecoderRoutingModule } from "./payload-decoder-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FormModule } from "@shared/components/forms/form.module";
import { PayloadDecoderDetailComponent } from "./payload-decoder-detail/payload-decoder-detail.component";
import { PayloadDecoderEditComponent } from "./payload-decoder-edit/payload-decoder-edit.component";
import { PayloadDecoderListComponent } from "./payload-decoder-list/payload-decoder-list.component";
import { PayloadDecoderTableComponent } from "./payload-decoder-list/payload-decoder-table/payload-decoder-table.component";
import { PayloadDecoderComponent } from "./payload-decoder.component";
import { SharedModule } from "@shared/shared.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { IotDevicesModule } from "@applications/iot-devices/iot-devices.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PipesModule } from "@shared/pipes/pipes.module";
import { IoTDeviceMinimalTableComponent } from "./payload-decoder-detail/iot-device-minimal-table/iot-device-minimal-table.component";

@NgModule({
    declarations: [
        PayloadDecoderComponent,
        PayloadDecoderTableComponent,
        PayloadDecoderEditComponent,
        PayloadDecoderDetailComponent,
        PayloadDecoderListComponent,
        IoTDeviceMinimalTableComponent,
    ],
    exports: [
        PayloadDecoderComponent,
        PayloadDecoderTableComponent,
        PayloadDecoderEditComponent,
        PayloadDecoderDetailComponent,
        PayloadDecoderListComponent,
        IoTDeviceMinimalTableComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        FormsModule,
        PayloadDecoderRoutingModule,
        ReactiveFormsModule,
        FormModule,
        SharedModule,
        NGMaterialModule,
        MonacoEditorModule,
        IotDevicesModule,
        FontAwesomeModule,
        PipesModule,
    ],
})
export class PayloadDecoderModule {}
