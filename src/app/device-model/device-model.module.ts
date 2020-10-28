import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceModelListComponent } from './device-model-list/device-model-list.component';
import { DeviceModelRoutingModule } from './device-model-routing.module';

@NgModule({
  declarations: [DeviceModelListComponent],
  imports: [
    CommonModule,
    DeviceModelRoutingModule
  ]
})
export class DeviceModelModule { }
