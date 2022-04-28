import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { Chart, registerables } from 'chart.js';
import { GraphComponent } from './graph.component';

// Register everything necessary to cover all configurations
Chart.register(...registerables);

@NgModule({
  declarations: [GraphComponent],
  imports: [CommonModule, NGMaterialModule, TranslateModule],
  exports: [GraphComponent],
})
export class GraphModule {}
