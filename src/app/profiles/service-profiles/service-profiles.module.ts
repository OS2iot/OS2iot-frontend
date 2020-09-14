import { NgModule } from '@angular/core';
import { ServiceProfilesListComponent } from './service-profiles-list/service-profiles-list.component';
import { ServiceProfileItemComponent } from './service-profiles-list/service-profile-item/service-profile-item.component';
import { ServiceProfilesComponent } from './service-profiles.component';
import { ServiceProfilesDetailComponent } from './service-profiles-detail/service-profiles-detail.component';
import { ServiceProfilesEditComponent } from './service-profiles-edit/service-profiles-edit.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@shared/form/form.module';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MaterialeModule } from '@shared/Modules/materiale.module';



@NgModule({
  declarations: [
    ServiceProfilesListComponent,
    ServiceProfileItemComponent,
    ServiceProfilesComponent,
    ServiceProfilesDetailComponent,
    ServiceProfilesEditComponent,
  ],
  exports: [
    ServiceProfilesListComponent
  ],
  imports: [
    PipesModule,
    FontAwesomeModule,
    DirectivesModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    TranslateModule,
    MaterialeModule
  ]
})
export class ServiceProfilesModule { }
