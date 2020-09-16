import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from './directives/directives.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AlertComponent,
    SearchBarComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    DirectivesModule,
    CommonModule,
  ],
  exports: [
    AlertComponent,
    TranslateModule,
    LoadingSpinnerComponent
  ],
})
export class SharedModule { }
