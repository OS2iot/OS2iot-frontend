import { NgModule } from '@angular/core';
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ServiceProfilesModule } from './service-profiles/service-profiles.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { RouterModule } from '@angular/router';
import { TopBarModule } from '@shared/top-bar/top-bar.module';
import { SharedModule } from '@shared/shared.module';
import { FormModule } from '@shared/form/form.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoggingService } from '@app/logging.service';
import { DeviceProfile } from './device-profiles/device-profile.model';
import { DeviceProfilesModule } from './device-profiles/device-profiles.module';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
  ],
  exports: [],
  imports: [
    ServiceProfilesModule,
    DeviceProfilesModule,
    ProfilesRoutingModule,
    RouterModule,
    TopBarModule,
    SharedModule,
    FormModule,
    TranslateModule

  ],
  providers: [
    LoggingService,
  ]
})
export class ProfilesModule { }
