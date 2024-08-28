import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { YesNoPipe } from "./yesNo.pipe";
import { ActiveDeactivePipe } from "./activeDeactive.pipe";
import { IsGlobalAdminPipe } from "./permission/is-global-admin.pipe";
import { CreatedUpdatedByPipe } from "./created-updated-by.pipe";
import { CustomDatePipe, CustomTableDatePipe, CustomTableDateWithSecondsPipe, DateOnlyPipe } from "./custom-date.pipe";
import { FilterDevicesPipe } from "./filter-devices.pipe";
import { TranslatePermissionsPipe } from "./permission/translate-permissions.pipe";
import { SortByPipe } from "./sort-by.pipe";
import { GatewayStatusTooltipPipe } from "./gateway/gateway-status-tooltip.pipe";
import { GatewayStatusClassPipe } from "./gateway/gateway-status-class.pipe";
import { CanEditApplicationPipe } from "./permission/can-edit-application.pipe";
import { SortByTranslationPipe } from "./sort-by-translation.pipe";

@NgModule({
  declarations: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CustomTableDateWithSecondsPipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe,
    CanEditApplicationPipe,
    SortByTranslationPipe,
  ],
  imports: [CommonModule],
  exports: [
    IsGlobalAdminPipe,
    ActiveDeactivePipe,
    YesNoPipe,
    CustomDatePipe,
    CustomTableDatePipe,
    CustomTableDateWithSecondsPipe,
    DateOnlyPipe,
    CreatedUpdatedByPipe,
    FilterDevicesPipe,
    TranslatePermissionsPipe,
    SortByPipe,
    GatewayStatusTooltipPipe,
    GatewayStatusClassPipe,
    CanEditApplicationPipe,
    SortByTranslationPipe,
  ],
  providers: [DateOnlyPipe],
})
export class PipesModule {}
