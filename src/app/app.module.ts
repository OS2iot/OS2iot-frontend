import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { MyApplicationsModule } from './my-applications/my-applications.module';
import { NavbarModule } from './navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrationGatewayModule } from './views/administration-gateway/administration-gateway.module';
import { DatatargetModule } from './views/datatarget/datatarget.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PayloadDecoderModule } from './payload-decoder/payload-decoder.module';
import { AuthModule } from './auth/auth.module';

import { GlobalErrorHandler } from '@shared/helpers/global-error-handler';
import { ServerErrorInterceptor } from '@shared/helpers/server-error.interceptor';
import { AuthJwtInterceptor } from './shared/helpers/auth-jwt.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AuthModule,
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
    bootstrap: [AppComponent],
    exports: [TranslateModule],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true }
    ],
})
export class AppModule { }
