import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TopBarComponent
  ]
})
export class SharedModule { }
