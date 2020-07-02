import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { NavbarComponent } from './navbar.component';

// Modules
import { SharedModule } from '../modules/shared/shared.module';

// Services
import { RestService } from '../modules/shared/services/rest.service';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    RestService,
  ]
})
export class NavbarModule { }
