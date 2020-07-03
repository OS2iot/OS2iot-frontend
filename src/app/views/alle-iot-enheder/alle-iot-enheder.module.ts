import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IotDeviceComponent } from './iot-device/iot-device.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';
import { AlleIotEnhederComponent } from './alle-iot-enheder/alle-iot-enheder.component';

@NgModule({
    declarations: [
        AlleIotEnhederComponent,
        IotDeviceComponent,
        IotDevicesTableComponent,
    ],
    imports: [CommonModule],
})
export class AlleIotEnhederModule {}
