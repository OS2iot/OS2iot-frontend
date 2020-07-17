import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TopBarSingleComponent } from './top-bar-single/top-bar-single.component';

@NgModule({
  declarations: [
    TopBarComponent,
    TopBarSingleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [
    TopBarComponent,
    TopBarSingleComponent,
  ]
})
export class TopBarModule { }
