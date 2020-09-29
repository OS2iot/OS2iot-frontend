import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceProfilesComponent } from './device-profiles.component';
import { DeviceProfilesListComponent } from './device-profiles-list/device-profiles-list.component';
import { DeviceProfilesItemComponent } from './device-profiles-list/device-profiles-item/device-profiles-item.component';
import { DeviceProfilesEditComponent } from './device-profiles-edit/device-profiles-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '@shared/directives/directives.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NGMaterialModule } from '@shared/Modules/materiale.module';
import { FormModule } from '@shared/components/forms/form.module';

@NgModule({
  declarations: [
    DeviceProfilesComponent,
    DeviceProfilesListComponent,
    DeviceProfilesItemComponent,
    DeviceProfilesEditComponent,
  ],
  imports: [
    FontAwesomeModule,
    DirectivesModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule,
    TranslateModule,
    NGMaterialModule,
  ],
  exports: [
    DeviceProfilesListComponent
  ]
})
export class DeviceProfilesModule { }
