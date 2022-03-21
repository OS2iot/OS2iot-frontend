import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe, DateOnlyPipe } from './custom-date.pipe';
import { FilterDevicesPipe } from './filter-devices.pipe';
import { SortByPipe } from './sort-by.pipe';

@NgModule({
  declarations: [
    isGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    SortByPipe
  ],
  imports: [CommonModule],
  exports: [
    isGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    SortByPipe
  ],
  providers: [
    DateOnlyPipe
  ]
})
export class PipesModule {}
