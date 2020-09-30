import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './directives/directives.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { BulkImportComponent } from './components/bulk-import/bulk-import.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    BulkImportComponent
  ],
  imports: [
    DirectivesModule,
    CommonModule,
  ],
  exports: [
    AlertComponent,
    TranslateModule,
    LoadingSpinnerComponent,
    BulkImportComponent
  ],
})
export class SharedModule { }
