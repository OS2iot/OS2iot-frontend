import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatargetTableComponent } from './datatarget-table/datatarget-table.component';
import { DatatargetTableRowComponent } from './datatarget-tabel-row/datatarget-tabel-row.component';
import { DatatargetListComponent } from './datatarget-list/datatarget-list.component';
import { DatatargetEditComponent } from './datatarget-edit/datatarget-edit.component';
import { DatatargetComponent } from './datatarget/datatarget.component';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarModule } from 'src/app/shared/top-bar/top-bar.module';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/shared/form/form.module';



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
    DatatargetComponent
  ]
})
export class DatatargetModule { }
