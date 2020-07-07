import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MineApplikationerComponent } from './mine-applikationer/mine-applikationer.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import { ApplicationsTableRowComponent } from './applications-table-row/applications-table-row.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { RouterModule } from '@angular/router';
import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from 'src/app/shared/form/form.module';

@NgModule({
    declarations: [
        MineApplikationerComponent,
        ApplicationComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent,
        CreateApplicationComponent,
    ],
    exports: [
        MineApplikationerComponent,
        ApplicationComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent,
        CreateApplicationComponent,
    ],
    imports: [
        CommonModule,
        TopBarModule,
        RouterModule,
        TranslateModule,
        FormModule,
    ]
})
export class MineApplikationerModule {}
