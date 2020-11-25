import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { CustomDatePipe } from './custom.datepipe';
import { CreatedUpdatedByPipe } from './created-updated-by.pipe';

@NgModule({
    declarations: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe,
        CustomDatePipe,
        CreatedUpdatedByPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe,
        CustomDatePipe,
        CreatedUpdatedByPipe,
    ]
})
export class PipesModule { }
