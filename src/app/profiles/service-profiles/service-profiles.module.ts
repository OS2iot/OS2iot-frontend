import * as fromServiceProfiles from './../service-profiles/store/service-profile.reducer';
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
import { MaterialModule } from '@shared-material';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



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
    FontAwesomeModule,
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
