import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { ActiveDeactivePipe } from './activeDeactive.pipe';

@NgModule({
    declarations: [
        ActiveDeactivePipe,
        YesNoPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ActiveDeactivePipe,
        YesNoPipe
    ]
})
export class PipesModule { }
