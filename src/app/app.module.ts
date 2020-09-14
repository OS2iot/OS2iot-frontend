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
import { appReducer, metaReducers } from './store/app.reducer';
import { ServiceProfileEffects } from './profiles/service-profiles/store/service-profile.effects';
import { environment } from '../environments/environment';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { MyApplicationsModule } from './my-applications/my-applications.module';

import { NavbarModule } from './navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrationGatewayModule } from './views/administration-gateway/administration-gateway.module';
import { DatatargetModule } from './views/datatarget/datatarget.module';
import { LoggingService } from './logging.service';
import { ProfilesModule } from './profiles/profiles.module';
import { PayloadDecoderModule } from './payload-decoder/payload-decoder.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        DashboardModule,
        MyApplicationsModule,
        DatatargetModule,
        NavbarModule,
        ProfilesModule,
        TranslateModule,
        StoreModule.forRoot(appReducer, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([ServiceProfileEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
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
        AdministrationGatewayModule,
        PayloadDecoderModule
    ],
    providers: [LoggingService],
    bootstrap: [AppComponent],
    exports: [TranslateModule],
})
export class AppModule { }
