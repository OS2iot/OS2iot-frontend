import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormHeaderComponent } from './form-header/form-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBodyApplicationComponent } from './form-body-application/form-body-application.component';
import { FormBodyIotDevicesComponent } from './form-body-iot-devices/form-body-iot-devices.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
  ],
  providers: [
  ]
})
export class FormModule { }
