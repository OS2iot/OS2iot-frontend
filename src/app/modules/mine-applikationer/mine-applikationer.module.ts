import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineApplikationerComponent } from './mine-applikationer/mine-applikationer.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';

@NgModule({
    declarations: [
        MineApplikationerComponent,
        ApplicationComponent,
        ApplicationsTableComponent,
    ],
    imports: [CommonModule],
})
export class MineApplikationerModule {}
