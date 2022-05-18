import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe, DateOnlyPipe } from './custom-date.pipe';
import { FilterDevicesPipe } from './filter-devices.pipe';
import { SortByPipe } from './sort-by.pipe';
import { GatewayStatusTooltipPipe } from './gateway/gateway-status-tooltip.pipe';
import { GatewayStatusClassPipe } from './gateway/gateway-status-class.pipe';

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
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe
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
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe
  ],
  providers: [
    DateOnlyPipe
  ]
})
export class PipesModule {}
