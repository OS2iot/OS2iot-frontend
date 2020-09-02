import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProfilesListComponent } from './service-profiles/service-profiles-list/service-profiles-list.component';
import { ProfilesComponent } from './profiles.component';
import { ProfilesRoutingModule } from './service-profiles/service-profiles-routing.module';
import { LoggingService } from '../logging.service';
import { ServiceProfilesComponent } from './service-profiles/service-profiles.component';
import { ServiceProfileService } from './service-profiles/service-profile.service';
import { ServiceProfileItemComponent } from './service-profiles/service-profiles-list/service-profile-item/service-profile-item.component';
import { ServiceProfilesDetailComponent } from './service-profiles/service-profiles-detail/service-profiles-detail.component';
import { ServiceProfilesEditComponent } from './service-profiles/service-profiles-edit/service-profiles-edit.component';
import { ServiceProfilesStartComponent } from './service-profiles/service-profiles-start/service-profiles-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromServiceProfiles from './service-profiles/store/service-profile.reducer';



@NgModule({
  declarations: [
    ProfilesComponent,
    ServiceProfilesListComponent,
    ServiceProfileItemComponent,
    ServiceProfilesComponent,
    ServiceProfilesDetailComponent,
    ServiceProfilesEditComponent,
    ServiceProfilesStartComponent],
  exports: [],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ProfilesRoutingModule,
    StoreModule.forFeature('serviceProfiles', fromServiceProfiles.serviceProfileReducer),
  ],
  providers: [LoggingService, ServiceProfileService]
})
export class ProfilesModule { }
