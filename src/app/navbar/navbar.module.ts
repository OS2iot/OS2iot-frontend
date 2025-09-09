import { CommonModule, NgOptimizedImage } from "@angular/common";
import { NgModule } from "@angular/core";

// Components
import { NavbarComponent } from "./navbar.component";

// Modules
import { SharedModule } from "../shared/shared.module";

// Services
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { InlineSVGModule } from "ng-inline-svg-2";
import { RestService } from "../shared/services/rest.service";
import { AdministrationComponent } from "./administration/administration.component";

@NgModule({
  declarations: [NavbarComponent, AdministrationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    NGMaterialModule,
    InlineSVGModule,
    NgOptimizedImage,
    MatIconModule,
  ],
  exports: [NavbarComponent],
  providers: [RestService, NavbarComponent],
})
export class NavbarModule {}
