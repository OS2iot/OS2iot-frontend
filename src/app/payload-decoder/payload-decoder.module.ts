import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PayloadDecoderRoutingModule } from './payload-decoder-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { PayloadDecoderDetailComponent } from './payload-decoder-detail/payload-decoder-detail.component';
import { PayloadDecoderEditComponent } from './payload-decoder-edit/payload-decoder-edit.component';
import { PayloadDecoderListComponent } from './payload-decoder-list/payload-decoder-list.component';
import { PayloadDecoderTableComponent } from './payload-decoder-list/payload-decoder-table/payload-decoder-table.component';
import { PayloadDecoderComponent } from './payload-decoder.component';
import { SharedModule } from '@shared/shared.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { DecodeFunctionComponent } from './payload-decoder-edit/decode-function/decode-function.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { IotDevicesModule } from '@applications/iot-devices/iot-devices.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PayloadDecoderComponent,
    PayloadDecoderTableComponent,
    PayloadDecoderEditComponent,
    PayloadDecoderDetailComponent,
    PayloadDecoderListComponent,
    DecodeFunctionComponent
  ],
  exports: [
    PayloadDecoderComponent,
    PayloadDecoderTableComponent,
    PayloadDecoderEditComponent,
    PayloadDecoderDetailComponent,
    PayloadDecoderListComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TopBarModule,
    PayloadDecoderRoutingModule,
    ReactiveFormsModule,
    FormModule,
    SharedModule,
    NGMaterialModule,
    MonacoEditorModule,
    IotDevicesModule,
    FontAwesomeModule,
  ]
})
export class PayloadDecoderModule { }
