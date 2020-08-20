import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { FormHeaderComponent } from './form-header/form-header.component';
import { FormsService } from '../_services/forms.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { FormBodyApplicationComponent } from './form-body-application/form-body-application.component';
import { FormBodyIotDevicesComponent } from './form-body-iot-devices/form-body-iot-devices.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FormComponent,
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
    QuestionComponent,
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
    FormComponent,
    FormHeaderComponent,
    FormBodyApplicationComponent,
    FormBodyIotDevicesComponent,
  ],
  providers: [
    FormsService,
  ]
})
export class FormModule { }
