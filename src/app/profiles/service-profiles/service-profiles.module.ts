import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProfilesEditComponent } from './service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesComponent } from './service-profiles.component';
import { ServiceProfilesListComponent } from './service-profiles-list/service-profiles-list.component';
import { ServiceProfileItemComponent } from './service-profiles-list/service-profile-item/service-profile-item.component';
import { ServiceProfilesDetailComponent } from './service-profiles-detail/service-profiles-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromServiceProfiles from './../service-profiles/store/service-profile.reducer';
import { RouterModule } from '@angular/router';
import { FormModule } from 'src/app/shared/form/form.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/shared/Modules/material.module';




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
    DirectivesModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    TranslateModule,
    MaterialModule,
    StoreModule.forFeature('serviceProfiles', fromServiceProfiles.serviceProfileReducer),
  ]
})
export class ServiceProfilesModule { }
