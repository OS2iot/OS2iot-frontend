import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeDa from '@angular/common/locales/da';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      DashboardModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
