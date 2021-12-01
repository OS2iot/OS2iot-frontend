import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';
import { CustomDatePipe, CustomTableDatePipe } from './custom-date.pipe';
import { UniquePermissionOrganizationsPipe } from './unique-permission-organizations.pipe';

@NgModule({
    declarations: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe,
        CustomDatePipe,
        CustomTableDatePipe,
        CreatedUpdatedByPipe,
        UniquePermissionOrganizationsPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe,
        CustomDatePipe,
        CustomTableDatePipe,
        CreatedUpdatedByPipe,
        UniquePermissionOrganizationsPipe,
    ]
})
export class PipesModule { }
