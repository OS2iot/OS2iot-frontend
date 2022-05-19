import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { IsGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe, DateOnlyPipe } from './custom-date.pipe';
import { FilterDevicesPipe } from './filter-devices.pipe';
import { TranslatePermissionsPipe } from './translate-permissions.pipe';
import { SortByPipe } from './sort-by.pipe';
import { GatewayStatusTooltipPipe } from './gateway/gateway-status-tooltip.pipe';
import { GatewayStatusClassPipe } from './gateway/gateway-status-class.pipe';

@NgModule({
  declarations: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe
  ],
  imports: [CommonModule],
  exports: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe
  ],
  providers: [
    DateOnlyPipe
  ]
})
export class PipesModule {}
