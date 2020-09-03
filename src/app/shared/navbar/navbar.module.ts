import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from './navbar.component';

// Modules
import { SharedModule } from '../shared.module';

// Services
import { RestService } from '../_services/rest.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    RestService,
  ]
})
export class NavbarModule { }
