import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarModule } from "./navbar/navbar.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProfilesModule } from "./profiles/profiles.module";
import { AuthJwtInterceptor } from "@shared/helpers/auth-jwt.interceptor";
import { AuthModule } from "./auth/auth.module";
import { GatewayModule } from "./gateway/gateway.module";
import { SharedVariableModule } from "@shared/shared-variable/shared-variable.module";
import { SAVER, getSaver } from "@shared/providers/saver.provider";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SearchModule } from "./search/search.module";
import { JwtModule } from "@auth0/angular-jwt";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntlDa } from "@shared/helpers/mat-paginator-intl-da";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NewUserComponent } from "./admin/users/new-kombit-user-page/new-user.component";
import { WelcomeDialogModule } from "@shared/components/welcome-dialog/welcome-dialog.module";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { MatSelectSearchModule } from "@shared/components/mat-select-search/mat-select-search.module";
import { UserPageComponent } from "./admin/users/user-page/user-page.component";
import { SharedModule } from "@shared/shared.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { CookieService } from "ngx-cookie-service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, NewUserComponent, UserPageComponent],
  imports: [
    SharedVariableModule.forRoot(),
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    ProfilesModule,
    TranslateModule.forRoot({
      defaultLanguage: "da",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NGMaterialModule,
    GatewayModule,
    MatSelectSearchModule,
    SearchModule,
    SharedModule,
    HttpClientModule,
    MatInputModule,
    MatTooltipModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
    MonacoEditorModule.forRoot(),
    WelcomeDialogModule,
    PipesModule,
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
  providers: [
    // use these two providers only in dev environment
    //{ provide: ErrorHandler, useClass: GlobalErrorHandler },
    //{ provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true },
    { provide: SAVER, useFactory: getSaver },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlDa },
    { provide: CookieService },
  ],
})
export class AppModule {}
