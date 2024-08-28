import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Components
import { NavbarComponent } from "./navbar.component";

// Modules
import { SharedModule } from "../shared/shared.module";

// Services
import { RestService } from "../shared/services/rest.service";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { GlobalAdminComponent } from "./global-admin/global-admin.component";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { OrganisationDropdownComponent } from "./organisation-dropdown/organisation-dropdown.component";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
  declarations: [NavbarComponent, GlobalAdminComponent, OrganisationDropdownComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    NGMaterialModule,
    InlineSVGModule,
  ],
  exports: [NavbarComponent],
  providers: [RestService, NavbarComponent],
})
export class NavbarModule {}
