import { NgModule } from '@angular/core';
import { ProfilesComponent } from './profiles.component';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { ServiceProfilesModule } from './service-profiles/service-profiles.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DeviceProfilesModule } from './device-profiles/device-profiles.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormModule } from '@shared/components/forms/form.module';
import { TopBarModule } from '@shared/components/top-bar/top-bar.module';

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

})
export class ProfilesModule { }
