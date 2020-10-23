import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubBarComponent } from './sub-bar/sub-bar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    SubBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    NGMaterialModule,
    FontAwesomeModule

  ],
  exports: [
    TopBarComponent,
    SubBarComponent,
  ]
})
export class TopBarModule { }
