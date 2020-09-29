import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationsComponent } from './applications.component';
import { IotDevicesModule } from './iot-devices/iot-devices.module';
import { ApplicaitonsRoutingModule } from './applications-routing.module';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationDetailComponent } from '../applications/application-detail/application-detail.component';
import { ApplicationsTableComponent } from './applications-list/applications-table/applications-table.component';
import { ApplicationsTableRowComponent } from './applications-list/applications-table/applications-table-row/applications-table-row.component';
import { DatatargetModule } from './datatarget/datatarget.module';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';

@NgModule({
    declarations: [
        ApplicationsComponent,
        ApplicationDetailComponent,
        ApplicationEditComponent,
        ApplicationsListComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent
    ],
    exports: [
        ApplicaitonsRoutingModule,
        ApplicationsComponent,

    ],
    imports: [
        CommonModule,
        TopBarModule,
        RouterModule,
        TranslateModule,
        IotDevicesModule,
        DatatargetModule,
        FormModule,
    ]
})
export class ApplicationsModule { }
