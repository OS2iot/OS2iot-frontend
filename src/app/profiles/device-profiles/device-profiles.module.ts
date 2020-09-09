import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceProfilesComponent } from './device-profiles.component';
import { DeviceProfilesListComponent } from './device-profiles-list/device-profiles-list.component';



@NgModule({
  declarations: [DeviceProfilesComponent, DeviceProfilesListComponent],
  imports: [
    CommonModule
  ]
})
export class DeviceProfilesModule { }
