import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesComponent } from './profiles.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { LoggingService } from '../logging.service';
import { RouterModule } from '@angular/router';
import { ServiceProfilesModule } from './service-profiles/service-profiles.module';
import { ProfilesListComponent } from './profiles-list/profiles-list.component';
import { SharedModule } from '../shared/shared.module';
import { TopBarModule } from '../shared/top-bar/top-bar.module';
import { FormModule } from '../shared/form/form.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilesDetailComponent } from './profiles-detail/profiles-detail.component';
import { ProfilesEditComponent } from './profiles-edit/profiles-edit.component';



@NgModule({
  declarations: [
    ProfilesComponent,
    ProfilesListComponent,
    ProfilesDetailComponent,
    ProfilesEditComponent,
  ],
  exports: [],
  imports: [
    ServiceProfilesModule,
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
