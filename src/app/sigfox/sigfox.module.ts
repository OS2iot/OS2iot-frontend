import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigfoxProfilesComponent } from './sigfox-profiles/sigfox-profiles.component';
import { SigfoxAdministrationComponent } from './sigfox-administration/sigfox-administration.component';
import { SigfoxRoutingModule } from './sigfox-routing.module';

@NgModule({
  declarations: [
    SigfoxProfilesComponent,
    SigfoxAdministrationComponent],
  imports: [
    CommonModule,
    SigfoxRoutingModule
  ]
})
export class SigfoxModule { }
