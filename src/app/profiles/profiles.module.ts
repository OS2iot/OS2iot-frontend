import { NgModule } from "@angular/core";
import { ProfilesComponent } from "./profiles.component";
import { ProfilesListComponent } from "./profiles-list/profiles-list.component";
import { ProfilesRoutingModule } from "./profiles-routing.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { TranslatePipe } from "@ngx-translate/core";
import { FormModule } from "@shared/components/forms/form.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DirectivesModule } from "@shared/directives/directives.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { DeviceProfilesEditComponent } from "./device-profiles/device-profiles-edit/device-profiles-edit.component";
import { DeviceProfilesItemComponent } from "./device-profiles/device-profiles-list/device-profiles-item/device-profiles-item.component";
import { DeviceProfilesListComponent } from "./device-profiles/device-profiles-list/device-profiles-list.component";

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
    DeviceProfilesListComponent,
    DeviceProfilesItemComponent,
    DeviceProfilesEditComponent,
  ],
  exports: [],
  imports: [
    ProfilesRoutingModule,
    RouterModule,
    SharedModule,
    FormModule,
    TranslatePipe,
    FontAwesomeModule,
    DirectivesModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NGMaterialModule,
    SharedModule,
    PipesModule,
  ],
})
export class ProfilesModule {}
