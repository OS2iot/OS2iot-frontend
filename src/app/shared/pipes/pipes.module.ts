import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe } from './custom-date.pipe';
import { FilterDevicesPipe } from './filter-devices.pipe';

@NgModule({
  declarations: [
    isGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
  ],
  imports: [CommonModule],
  exports: [
    isGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
  ],
  providers: [
    CustomTableDatePipe
  ]
})
export class PipesModule {}
