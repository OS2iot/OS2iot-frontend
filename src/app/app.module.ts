import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DashboardModule } from './views/dashboard/dashboard.module';
import { MineApplikationerModule } from './views/mine-applikationer/mine-applikationer.module';
import { AlleIotEnhederModule } from './views/alle-iot-enheder/alle-iot-enheder.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IoTDeviceModule } from './views/iot-device/iot-device.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IoTDeviceComponent } from './views/iot-device/iot-device/iot-device.component';

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
        IoTDeviceModule,
        NavbarModule,
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
        FormlyModule.forRoot({
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
        }),
        FormlyBootstrapModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [TranslateModule],
})
export class AppModule {}
