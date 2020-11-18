import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './directives/directives.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { BatteriStatusComponent } from './components/batteri-status/batteri-status.component';
import { MapComponent } from './components/map/map.component';
import { NGMaterialModule } from './Modules/materiale.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { OpendatadkDialogComponent } from './components/opendatadk-dialog/opendatadk-dialog.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent,
    DeleteDialogComponent,
    OpendatadkDialogComponent
  ],
  imports: [
    DirectivesModule,
    CommonModule,
    NGMaterialModule,
    TranslateModule
  ],
  exports: [
    AlertComponent,
    TranslateModule,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent,
    DeleteDialogComponent,
    OpendatadkDialogComponent
  ],
})
export class SharedModule { }
