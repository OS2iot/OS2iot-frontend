import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IoTDeviceDetailComponent } from './iot-device-detail/iot-device-detail.component';
import { IotDeviceEditComponent } from './iot-device-edit/iot-device-edit.component';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { IotDevicesTableRowComponent } from './iot-devices-table/iot-devices-table-row/iot-devices-table-row.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';

@NgModule({
    declarations: [

        IotDevicesTableComponent,
        IotDevicesTableRowComponent,
        IoTDeviceDetailComponent,
        IotDeviceEditComponent
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
        NGMaterialModule
    ],
})
export class IotDevicesModule { }
