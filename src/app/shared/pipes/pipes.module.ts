import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';
import { isGlobalAdminPipe } from './is-global-admin.pipe';
import { OrganisationFilterPipe } from './organisation-filter.pipe';

@NgModule({
    declarations: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe,
        OrganisationFilterPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        isGlobalAdminPipe,
        ActiveDeactivePipe,
        YesNoPipe
    ]
})
export class PipesModule { }
