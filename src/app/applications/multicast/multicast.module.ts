import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MulticastDetailComponent } from './multicast-detail/multicast-detail.component';
import { MulticastEditComponent } from './multicast-edit/multicast-edit.component';
import { MulticastTableComponent } from './multicast-table/multicast-table.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatSelectSearchModule } from '@shared/components/mat-select-search/mat-select-search.module';

@NgModule({
  declarations: [
    MulticastDetailComponent,
    MulticastEditComponent,
    MulticastTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    NGMaterialModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PipesModule,
    MatSelectSearchModule,
  ],
  exports: [
    MulticastDetailComponent,
    MulticastEditComponent,
    MulticastTableComponent,
  ],
})
export class MulticastModule {}
