import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormHeaderComponent } from './form-header/form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBodyApplicationComponent } from './form-body-application/form-body-application.component';
import { FormBodyIotDevicesComponent } from './form-body-iot-devices/form-body-iot-devices.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBodyDatatargetComponent } from './form-body-datatarget/form-body-datatarget.component';
import { FormBodyLoraGatewayComponent } from './form-body-lora-gateway/form-body-lora-gateway.component';
import { NGMaterialModule } from '@shared/Modules/materiale.module';


@NgModule({
  declarations: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
    FormBodyLoraGatewayComponent,
    FormBodyDatatargetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NGMaterialModule
  ],
  exports: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
    FormBodyLoraGatewayComponent,
    FormBodyDatatargetComponent
  ],
  providers: [
  ]
})
export class FormModule { }
