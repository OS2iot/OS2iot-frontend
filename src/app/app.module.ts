import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule, TranslateLoader, } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MineApplikationerModule } from './modules/mine-applikationer/mine-applikationer.module';
import { AlleIotEnhederModule } from './modules/alle-iot-enheder/alle-iot-enheder.module';
import { SharedModule } from './modules/shared/shared.module';
import { NavbarModule } from './navbar/navbar.module';

import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      DashboardModule,
      MineApplikationerModule,
      AlleIotEnhederModule,
      SharedModule,
      NavbarModule,
      TranslateModule.forRoot({
        defaultLanguage: 'da',
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
