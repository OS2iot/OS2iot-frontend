import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceProfilesComponent } from './device-profiles.component';
import { DeviceProfilesListComponent } from './device-profiles-list/device-profiles-list.component';
import { DeviceProfilesItemComponent } from './device-profiles-list/device-profiles-item/device-profiles-item.component';
import { DeviceProfilesEditComponent } from './device-profiles-edit/device-profiles-edit.component';
import { DeviceProfilesDetailComponent } from './device-profiles-detail/device-profiles-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '@shared/directives/directives.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '@shared/form/form.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { MaterialeModule } from '@shared/Modules/materiale.module';

@NgModule({
  declarations: [
    DeviceProfilesComponent,
    DeviceProfilesListComponent,
    DeviceProfilesItemComponent,
    DeviceProfilesEditComponent,
    DeviceProfilesDetailComponent
  ],
  imports: [
    FontAwesomeModule,
    DirectivesModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    TranslateModule,
    MaterialeModule,
  ],
  exports: [
    DeviceProfilesListComponent
  ]
})
export class DeviceProfilesModule { }
