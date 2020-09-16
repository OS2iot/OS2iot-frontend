import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceProfilesListComponent } from './service-profiles-list/service-profiles-list.component';
import { ServiceProfileItemComponent } from './service-profiles-list/service-profile-item/service-profile-item.component';
import { ServiceProfilesComponent } from './service-profiles.component';
import { ServiceProfilesDetailComponent } from './service-profiles-detail/service-profiles-detail.component';
import { ServiceProfilesEditComponent } from './service-profiles-edit/service-profiles-edit.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MaterialeModule } from '@shared/modules/materiale.module';
import { FormModule } from '@shared/form/form.module';




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
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    PipesModule,
    FontAwesomeModule,
    DirectivesModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialeModule
  ]
})
export class ServiceProfilesModule { }
