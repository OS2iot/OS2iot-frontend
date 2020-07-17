import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { FormModule } from 'src/app/shared/form/form.module';

import { MineApplikationerComponent } from './mine-applikationer/mine-applikationer.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationsTableComponent } from './applications-table/applications-table.component';
import { ApplicationsTableRowComponent } from './applications-table-row/applications-table-row.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { ListApplicationsComponent } from './list-applications/list-applications.component';
import { AlleIotEnhederModule } from '../alle-iot-enheder/alle-iot-enheder.module';

@NgModule({
    declarations: [
        MineApplikationerComponent,
        ApplicationComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent,
        CreateApplicationComponent,
        EditApplicationComponent,
        ListApplicationsComponent,
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
        AlleIotEnhederModule
    ]
})
export class MineApplikationerModule {}
