import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationsComponent } from './applications.component';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { ApplicationsTableRowComponent } from './applications-list/applications-table/applications-table-row/applications-table-row.component';
import { ApplicationsTableComponent } from './applications-list/applications-table/applications-table.component';
import { ApplicaitonsRoutingModule } from './applications-routing.module';
import { DatatargetModule } from './datatarget/datatarget.module';
import { IotDevicesModule } from './iot-devices/iot-devices.module';
import { SharedModule } from '@shared/shared.module';
import { BulkImportComponent } from './bulk-import/bulk-import.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '@shared/directives/directives.module';

@NgModule({
    declarations: [
        ApplicationsComponent,
        ApplicationDetailComponent,
        ApplicationEditComponent,
        ApplicationsListComponent,
        ApplicationsTableComponent,
        ApplicationsTableRowComponent,
        BulkImportComponent
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
        DirectivesModule,
        FormModule,
        SharedModule,
        FontAwesomeModule
    ]
})
export class ApplicationsModule { }
