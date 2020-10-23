import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './directives/directives.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { BatteriStatusComponent } from './components/batteri-status/batteri-status.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent
  ],
  imports: [
    DirectivesModule,
    CommonModule,
  ],
  exports: [
    AlertComponent,
    TranslateModule,
    LoadingSpinnerComponent,
    BatteriStatusComponent,
    MapComponent
  ],
})
export class SharedModule { }
