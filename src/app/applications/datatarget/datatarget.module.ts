import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslatePipe } from "@ngx-translate/core";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { FormModule } from "@shared/components/forms/form.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { SharedModule } from "@shared/shared.module";
import { DatatargetDetailTypeSelectorDirective } from "./datatarget-detail/datatarget-detail-type-selector.directive";
import { DatatargetDetailComponent } from "./datatarget-detail/datatarget-detail.component";
import { DatatargetEditTypeSelectorDirective } from "./datatarget-edit/datatarget-edit-type-selector.directive";
import { DatatargetEditComponent } from "./datatarget-edit/datatarget-edit.component";
import { DatatargetLogComponent } from "./datatarget-log/datatarget-log.component";
import { DatatargetNewComponent } from "./datatarget-new/datatarget-new.component";
import { DatatargetTabComponent } from "./datatarget-tab/datatarget-tab.component";
import { DatatargetTableComponent } from "./datatarget-table/datatarget-table.component";
import { FiwareDetailTabsComponent } from "./fiware/fiware-detail-tabs/fiware-detail-tabs.component";
import { FiwareDetailComponent } from "./fiware/fiware-detail/fiware-detail.component";
import { FiwareEditComponent } from "./fiware/fiware-edit/fiware-edit.component";
import { HttppushDetailTabsComponent } from "./httppush/httppush-detail-tabs/httppush-detail-tabs.component";
import { HttppushDetailComponent } from "./httppush/httppush-detail/httppush-detail.component";
import { HttppushEditComponent } from "./httppush/httppush-edit/httppush-edit.component";
import { MqttDetailTabsComponent } from "./mqtt/mqtt-detail-tabs/mqtt-detail-tabs.component";
import { MqttDetailComponent } from "./mqtt/mqtt-detail/mqtt-detail.component";
import { MqttEditComponent } from "./mqtt/mqtt-edit/mqtt-edit.component";
import { OpendatadkDetailComponent } from "./opendatadk/opendatadk-detail/opendatadk-detail.component";
import { OpendatadkEditComponent } from "./opendatadk/opendatadk-edit/opendatadk-edit.component";
import { OpenDataDkMailDialogComponent } from "./opendatadk/opendatadk-edit/opendatadk-mail-dialog/opendatadk-mail-dialog";
import { OpenDataDkWarningDialogComponent } from "./opendatadk/opendatadk-edit/opendatadk-warning-dialog/opendatadk-warning-dialog";
import { DatatargetTestConnectionComponent } from "./datatarget-test-connection/datatarget-test-connection.component";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";

@NgModule({
  declarations: [
    DatatargetTableComponent,
    DatatargetEditComponent,
    DatatargetNewComponent,
    DatatargetDetailComponent,
    DatatargetLogComponent,
    FiwareDetailTabsComponent,
    FiwareDetailComponent,
    FiwareEditComponent,
    HttppushDetailTabsComponent,
    HttppushDetailComponent,
    HttppushEditComponent,
    OpendatadkEditComponent,
    OpendatadkDetailComponent,
    OpenDataDkMailDialogComponent,
    OpenDataDkWarningDialogComponent,
    MqttDetailTabsComponent,
    MqttDetailComponent,
    MqttEditComponent,
    DatatargetDetailTypeSelectorDirective,
    DatatargetEditTypeSelectorDirective,
    DatatargetTabComponent,
    DatatargetTestConnectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    FormModule,
    NGMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule,
    MonacoEditorModule,
  ],
  exports: [
    DatatargetTableComponent,
    DatatargetEditComponent,
    DatatargetNewComponent,
    DatatargetDetailComponent,
    FiwareDetailComponent,
    FiwareEditComponent,
    HttppushDetailComponent,
    HttppushEditComponent,
    NGMaterialModule,
  ],
})
export class DatatargetModule {}
