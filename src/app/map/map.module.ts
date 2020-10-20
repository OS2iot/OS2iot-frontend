import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { FormModule } from '@shared/components/forms/form.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    FormModule,
    FormsModule,
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
