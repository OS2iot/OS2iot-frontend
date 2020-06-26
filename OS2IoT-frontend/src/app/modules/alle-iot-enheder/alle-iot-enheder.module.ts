import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlleIotEnhederRoutingModule } from './alle-iot-enheder-routing.module';
import { AlleIotEnhederComponent } from './alle-iot-enheder.component';
import { IotDeviceComponent } from './iot-device/iot-device.component';
import { IotDevicesTableComponent } from './iot-devices-table/iot-devices-table.component';


@NgModule({
  declarations: [AlleIotEnhederComponent, IotDeviceComponent, IotDevicesTableComponent],
  imports: [
    CommonModule,
    AlleIotEnhederRoutingModule
  ]
})
export class AlleIotEnhederModule { }
