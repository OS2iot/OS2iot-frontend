import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from './navbar.component';

// Modules
import { SharedModule } from '../shared/shared.module';

// Services
import { RestService } from '../shared/services/rest.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GlobalAdminComponent } from './global-admin/global-admin.component';
import { NGMaterialModule } from '@shared/Modules/materiale.module';

@NgModule({
  declarations: [NavbarComponent, GlobalAdminComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    NGMaterialModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    RestService,
  ]
})
export class NavbarModule { }
