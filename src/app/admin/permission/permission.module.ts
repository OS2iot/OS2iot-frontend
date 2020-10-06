import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PermissionComponent } from './permission.component';
import { PermissionEditComponent } from './permission-edit/permission-edit.component';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@shared/pipes/pipes.module';
import { PermissionRowComponent } from './permission-list/permission-tabel/permission-row/permission-row.component';
import { PermissionTabelComponent } from './permission-list/permission-tabel/permission-tabel.component';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';

@NgModule({
  declarations: [
    PermissionComponent,
    PermissionEditComponent,
    PermissionDetailComponent,
    PermissionListComponent,
    PermissionTabelComponent,
    PermissionRowComponent,
  ],
  exports: [
    PermissionComponent,
    PermissionEditComponent,
    PermissionDetailComponent,
    PermissionListComponent,
    PermissionTabelComponent,
    PermissionRowComponent,
  ],
  imports: [
    NGMaterialModule,
    PipesModule,
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    TopBarModule,
    ReactiveFormsModule,
    FormModule,
  ],
})
export class PermissionModule { }
