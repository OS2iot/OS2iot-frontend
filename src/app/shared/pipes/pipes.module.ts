import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { IsGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe } from './custom-date.pipe';
import { FilterDevicesPipe } from './filter-devices.pipe';
import { TranslatePermissionsPipe } from './translate-permissions.pipe';

@NgModule({
  declarations: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
  ],
  imports: [CommonModule],
  exports: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
  ],
})
export class PipesModule {}
