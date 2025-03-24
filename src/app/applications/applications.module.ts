import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { BasicInformationBoxComponent } from "@shared/components/basic-information-box/basic-information-box.component";
import { FormModule } from "@shared/components/forms/form.module";
import { OptionFieldComponent } from "@shared/components/option-field/option-field.component";
import { StatusIconComponent } from "@shared/components/status-icon/status-icon.component";
import { TablePaginatorComponent } from "@shared/components/table-pagiantor.ts/table-paginator.component";
import { TableSortIconComponent } from "@shared/components/table-sort-icon/table-sort-icon.component";
import { DirectivesModule } from "@shared/directives/directives.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { SharedModule } from "@shared/shared.module";
import { ApplicationChangeOrganizationDialogComponent } from "./application-change-organization-dialog/application-change-organization-dialog.component";
import { ApplicationDetailComponent } from "./application-detail/application-detail.component";
import { ApplicationEditComponent } from "./application-edit/application-edit.component";
import { ApplicationFilterComponent } from "./applications-list/application-filter/application-filter.component";
import { ApplicationMapComponent } from "./applications-list/application-map/application-map.component";
import { ApplicationsListDashboardComponent } from "./applications-list/applications-list-dashboard/applications-list-dashboard.component";
import { ApplicationsListComponent } from "./applications-list/applications-list.component";
import { ApplicationsTableComponent } from "./applications-list/applications-table/applications-table.component";
import { ApplicaitonsRoutingModule } from "./applications-routing.module";
import { ApplicationsComponent } from "./applications.component";
import { BulkImportComponent } from "./bulk-import/bulk-import.component";
import { DatatargetModule } from "./datatarget/datatarget.module";
import { IotDevicesModule } from "./iot-devices/iot-devices.module";
import { MulticastModule } from "./multicast/multicast.module";
import { BasicTabSwitchComponent } from "@shared/components/basic-tab-switch/basic-tab-switch.component";

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationDetailComponent,
    ApplicationEditComponent,
    ApplicationsListComponent,
    BulkImportComponent,
    ApplicationsTableComponent,
    ApplicationChangeOrganizationDialogComponent,
  ],
  exports: [ApplicaitonsRoutingModule, ApplicationsComponent, ApplicationsTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    IotDevicesModule,
    DatatargetModule,
    DirectivesModule,
    FormModule,
    SharedModule,
    FontAwesomeModule,
    NGMaterialModule,
    PipesModule,
    MulticastModule,
    ReactiveFormsModule,
    OptionFieldComponent,
    StatusIconComponent,
    TableSortIconComponent,
    TablePaginatorComponent,
    BasicTabSwitchComponent,
    ApplicationMapComponent,
    BasicInformationBoxComponent,
    ApplicationFilterComponent,
    ApplicationsListDashboardComponent,
  ],
})
export class ApplicationsModule {}
