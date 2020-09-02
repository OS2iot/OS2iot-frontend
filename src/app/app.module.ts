import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { appReducer } from './store/app.reducer';
import { ServiceProfileEffects } from './profiles/service-profiles/store/service-profile.effects';
import { environment } from '../environments/environment';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { MineApplikationerModule } from './my-applications/my-applications.module';
import { AlleIotEnhederModule } from './views/alle-iot-enheder/alle-iot-enheder.module';
import { NavbarModule } from './navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggingService } from './logging.service';
import { ProfilesModule } from './profiles/profiles.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        DashboardModule,
        MineApplikationerModule,
        AlleIotEnhederModule,
        NavbarModule,
        ProfilesModule,
        StoreModule.forRoot(appReducer, { runtimeChecks: {} }),
        EffectsModule.forRoot([ServiceProfileEffects]),
        StoreDevtoolsModule.instrument({ logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot(),
        TranslateModule.forRoot({
            defaultLanguage: 'da',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}, {}),
    ],
    providers: [LoggingService],
    bootstrap: [AppComponent],
    exports: [TranslateModule],
})
export class AppModule { }
