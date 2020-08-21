import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { FormModule } from 'src/app/shared/form/form.module';

import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';
import { IotDevicesTableRowComponent } from './iot-devices-table-row/iot-devices-table-row.component';
import { AlleIotEnhederComponent } from './alle-iot-enheder/alle-iot-enheder.component';
import { ListIotDevicesComponent } from './list-iot-devices/list-iot-devices.component';
import { IoTDeviceComponent } from './iot-device/iot-device.component';
import { EditIotDeviceComponent } from './edit-iot-device/edit-iot-device.component';

@NgModule({
    declarations: [
        AlleIotEnhederComponent,
        IotDevicesTableComponent,
        ListIotDevicesComponent,
        IotDevicesTableRowComponent,
        IoTDeviceComponent,
        EditIotDeviceComponent
    ],
    exports: [
        AlleIotEnhederComponent,
        IotDevicesTableComponent,
        ListIotDevicesComponent,
        IoTDeviceComponent
    ],
    imports: [
        CommonModule,
        TopBarModule,
        RouterModule,
        TranslateModule,
        FormModule,
    ],
})
export class AlleIotEnhederModule {}
