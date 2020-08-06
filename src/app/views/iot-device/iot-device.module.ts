import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CreateIoTDeviceComponent } from './create-iot-device/create-iot-device.component';
import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IoTDeviceComponent } from './iot-device/iot-device.component';

@NgModule({
    declarations: [CreateIoTDeviceComponent, IoTDeviceComponent],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormlyBootstrapModule,
        MatStepperModule,
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        TopBarModule,
    ],
})
export class IoTDeviceModule {}
