import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatargetTableComponent } from './datatarget-table/datatarget-table.component';
import { DatatargetTableRowComponent } from './datatarget-tabel-row/datatarget-tabel-row.component';
import { DatatargetListComponent } from './datatarget-list/datatarget-list.component';
import { DatatargetEditComponent } from './datatarget-edit/datatarget-edit.component';
import { DatatargetComponent } from './datatarget/datatarget.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';

@NgModule({
  declarations: [
    DatatargetTableComponent,
    DatatargetTableRowComponent,
    DatatargetListComponent,
    DatatargetEditComponent,
    DatatargetComponent],
  imports: [
    CommonModule,
    TopBarModule,
    RouterModule,
    TranslateModule,
    FormModule,
  ],
  exports: [
    DatatargetTableComponent,
    DatatargetTableRowComponent,
    DatatargetListComponent,
    DatatargetEditComponent,
    DatatargetComponent,
    NGMaterialModule
  ]
})
export class DatatargetModule { }
