import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProfilesListComponent } from './service-profiles/service-profiles-list/service-profiles-list.component';
import { ProfilesComponent } from './profiles.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { LoggingService } from '../logging.service';
import { ServiceProfilesComponent } from './service-profiles/service-profiles.component';
import { ServiceProfileService } from './service-profiles/service-profile.service';
import { ServiceProfileItemComponent } from './service-profiles/service-profiles-list/service-profile-item/service-profile-item.component';



@NgModule({
  declarations: [ProfilesComponent, ServiceProfilesListComponent, ServiceProfileItemComponent, ServiceProfilesComponent],
  exports: [],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
  ],
  providers: [LoggingService, ServiceProfileService]
})
export class ProfilesModule { }
