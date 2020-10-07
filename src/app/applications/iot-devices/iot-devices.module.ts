import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { IoTDeviceDetailComponent } from './iot-device-detail/iot-device-detail.component';
import { IotDeviceEditComponent } from './iot-device-edit/iot-device-edit.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';
import { IotDevicesTableRowComponent } from './iot-devices-table/iot-devices-table-row/iot-devices-table-row.component';
import { SigfoxDeviceEditComponent } from './iot-device-edit/sigfox-device-edit/sigfox-device-edit.component';

@NgModule({
    declarations: [

        IotDevicesTableComponent,
        IotDevicesTableRowComponent,
        IoTDeviceDetailComponent,
        IotDeviceEditComponent,
        SigfoxDeviceEditComponent
    ],
    exports: [
        IotDevicesTableComponent,
        IoTDeviceDetailComponent
    ],
    imports: [
        CommonModule,
        TopBarModule,
        RouterModule,
        TranslateModule,
        FormModule,
        NGMaterialModule,
        FormsModule
    ],
})
export class IotDevicesModule { }
