import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ApplicationsComponent } from "./applications.component";
import { FormModule } from "@shared/components/forms/form.module";
import { ApplicationDetailComponent } from "./application-detail/application-detail.component";
import { ApplicationEditComponent } from "./application-edit/application-edit.component";
import { ApplicationsListComponent } from "./applications-list/applications-list.component";
import { ApplicaitonsRoutingModule } from "./applications-routing.module";
import { DatatargetModule } from "./datatarget/datatarget.module";
import { IotDevicesModule } from "./iot-devices/iot-devices.module";
import { SharedModule } from "@shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DirectivesModule } from "@shared/directives/directives.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { BulkImportComponent } from "./bulk-import/bulk-import.component";
import { PipesModule } from "@shared/pipes/pipes.module";
import { ApplicationsTableComponent } from "./applications-list/applications-table/applications-table.component";
import { MulticastModule } from "./multicast/multicast.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ApplicationChangeOrganizationDialogComponent } from "./application-change-organization-dialog/application-change-organization-dialog.component";

@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationDetailComponent,
    ApplicationEditComponent,
    ApplicationsListComponent,
    ApplicationsTableComponent,
    BulkImportComponent,
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
  ],
})
export class ApplicationsModule {}
