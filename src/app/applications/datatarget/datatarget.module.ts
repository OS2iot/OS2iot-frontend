import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatargetTableComponent } from './datatarget-table/datatarget-table.component';
import { DatatargetListComponent } from './datatarget-list/datatarget-list.component';
import { DatatargetEditComponent } from './datatarget-edit/datatarget-edit.component';
import { DatatargetDetailComponent } from './datatarget-detail/datatarget-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { OpendatadkComponent } from './opendatadk/opendatadk.component';
import { OpendatadkEditComponent } from './opendatadk/opendatadk-edit/opendatadk-edit.component';
import { OpendatadkDetailComponent } from './opendatadk/opendatadk-detail/opendatadk-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DatatargetTableComponent,
    DatatargetListComponent,
    DatatargetEditComponent,
    DatatargetDetailComponent,
    OpendatadkComponent,
    OpendatadkEditComponent,
    OpendatadkDetailComponent],
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
  ],
  exports: [
    DatatargetTableComponent,
    DatatargetListComponent,
    DatatargetEditComponent,
    DatatargetDetailComponent,
    NGMaterialModule
  ]
})
export class DatatargetModule { }
