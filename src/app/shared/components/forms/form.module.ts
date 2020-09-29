import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormBodyApplicationComponent } from './form-body-application/form-body-application.component';
import { FormBodyDatatargetComponent } from './form-body-datatarget/form-body-datatarget.component';
import { FormBodyIotDevicesComponent } from './form-body-iot-devices/form-body-iot-devices.component';
import { FormHeaderComponent } from './form-header/form-header.component';


@NgModule({
  declarations: [
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
    FormBodyDatatargetComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
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
    FormBodyDatatargetComponent
  ],
  providers: [
  ]
})
export class FormModule { }
