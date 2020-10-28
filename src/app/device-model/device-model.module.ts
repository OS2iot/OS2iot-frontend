import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceModelListComponent } from './device-model-list/device-model-list.component';
import { DeviceModelRoutingModule } from './device-model-routing.module';
import { DeviceModelTableComponent } from './device-model-table/device-model-table.component';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';

@NgModule({
  declarations: [DeviceModelListComponent, DeviceModelTableComponent],
  imports: [
    CommonModule,
    DeviceModelRoutingModule,
    NGMaterialModule,
    TranslateModule,
    TopBarModule
  ]
})
export class DeviceModelModule { }
