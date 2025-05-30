import { NgIf } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule, Title } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtModule } from "@auth0/angular-jwt";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MatSelectSearchModule } from "@shared/components/mat-select-search/mat-select-search.module";
import { WelcomeDialogModule } from "@shared/components/welcome-dialog/welcome-dialog.module";
import { AuthJwtInterceptor } from "@shared/helpers/auth-jwt.interceptor";
import { MatPaginatorIntlDa } from "@shared/helpers/mat-paginator-intl-da";
import { NGMaterialModule } from "@shared/Modules/materiale.module";
import { PipesModule } from "@shared/pipes/pipes.module";
import { SAVER, getSaver } from "@shared/providers/saver.provider";
import { SharedVariableModule } from "@shared/shared-variable/shared-variable.module";
import { SharedModule } from "@shared/shared.module";
import { CookieService } from "ngx-cookie-service";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { NewUserComponent } from "./admin/users/new-kombit-user-page/new-user.component";
import { UserPageComponent } from "./admin/users/user-page/user-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { GatewayModule } from "./gateway/gateway.module";
import { NavbarModule } from "./navbar/navbar.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { SearchModule } from "./search/search.module";

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
    NgIf,
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
