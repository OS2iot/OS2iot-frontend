import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatargetTableComponent } from "./datatarget-table/datatarget-table.component";
import { DatatargetEditComponent } from "./datatarget-edit/datatarget-edit.component";
import { DatatargetDetailComponent } from "./datatarget-detail/datatarget-detail.component";
import { TranslateModule } from "@ngx-translate/core";
import { RouterModule } from "@angular/router";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { FormModule } from "@shared/components/forms/form.module";
import { OpendatadkComponent } from "./opendatadk/opendatadk.component";
import { OpendatadkEditComponent } from "./opendatadk/opendatadk-edit/opendatadk-edit.component";
import { OpendatadkDetailComponent } from "./opendatadk/opendatadk-detail/opendatadk-detail.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { DatatargetNewComponent } from "./datatarget-new/datatarget-new.component";
import { FiwareEditComponent } from "./fiware/fiware-edit/fiware-edit.component";
import { FiwareDetailComponent } from "./fiware/fiware-detail/fiware-detail.component";
import { HttppushDetailComponent } from "./httppush/httppush-detail/httppush-detail.component";
import { HttppushEditComponent } from "./httppush/httppush-edit/httppush-edit.component";
import { DatatargetDetailTypeSelectorDirective } from "./datatarget-detail/datatarget-detail-type-selector.directive";
import { DatatargetEditTypeSelectorDirective } from "./datatarget-edit/datatarget-edit-type-selector.directive";
import { MqttEditComponent } from "./mqtt-edit/mqtt-edit.component";
import { MqttDetailComponent } from "./mqtt-detail/mqtt-detail.component";
import { DatatargetTabComponent } from "./datatarget-tab/datatarget-tab.component";
import { OpenDataDkMailDialogComponent } from "./opendatadk/opendatadk-edit/opendatadk-mail-dialog/opendatadk-mail-dialog";
import { OpenDataDkWarningDialogComponent } from "./opendatadk/opendatadk-edit/opendatadk-warning-dialog/opendatadk-warning-dialog";

@NgModule({
  declarations: [
    DatatargetTableComponent,
    DatatargetEditComponent,
    DatatargetNewComponent,
    DatatargetDetailComponent,
    FiwareDetailComponent,
    FiwareEditComponent,
    HttppushDetailComponent,
    HttppushEditComponent,
    OpendatadkComponent,
    OpendatadkEditComponent,
    OpendatadkDetailComponent,
    OpenDataDkMailDialogComponent,
    OpenDataDkWarningDialogComponent,
    MqttDetailComponent,
    MqttEditComponent,
    DatatargetDetailTypeSelectorDirective,
    DatatargetEditTypeSelectorDirective,
    DatatargetTabComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormModule,
    NGMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule,
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
