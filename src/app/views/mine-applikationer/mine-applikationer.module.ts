import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineApplikationerComponent } from './mine-applikationer/mine-applikationer.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import { ApplicationsTableRowComponent } from './applications-table-row/applications-table-row.component';

@NgModule({
    declarations: [
        MineApplikationerComponent,
        ApplicationComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent,
    ],
    imports: [CommonModule],
})
export class MineApplikationerModule {}
