import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { TopBarComponent } from './top-bar/top-bar.component';
import { AlertComponent } from './alert/alert.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TopBarComponent, 
    AlertComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [
    TopBarComponent,
    AlertComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule,
  ]
})
export class SharedModule { }
