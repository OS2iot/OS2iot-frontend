import { Injectable } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { of } from 'rxjs/internal/observable/of';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { UserResponse } from '../admin/users/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthResponseData {
  accessToken: string;
}

export interface CurrentUserInfoResponse {
  user: UserResponse;
  organizations: Organisation[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private URL = 'auth/login';

  private readonly LOCAL_STORAGE_JWT_LOCATION = 'id_token';

  constructor(
    private http: HttpClient,
    private restService: RestService,
    private jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.LOCAL_STORAGE_JWT_LOCATION);
    return !this.jwtHelper.isTokenExpired(token);
  }

  // global-admin@os2iot.dk
  // hunter2

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.baseUrl + this.URL, {
        username: username,
        password: password,
      })
      .pipe(
        tap((res) => this.setSession(res.accessToken)),
        catchError((error: HttpErrorResponse) => {
          return of(error.status);
        })
      );
  }

  me(): Observable<CurrentUserInfoResponse> {
    return this.restService.get('auth/me').pipe(
      shareReplay(1)
    );
  }

  setSession(jwt: string) {
    localStorage.setItem(this.LOCAL_STORAGE_JWT_LOCATION, jwt);
  }

  getJwt() {
    return localStorage.getItem(this.LOCAL_STORAGE_JWT_LOCATION);
  }

  isLoggedInWithKombit() {
    const jwt = localStorage.getItem(this.LOCAL_STORAGE_JWT_LOCATION);

    const token = this.getDecodedAccessToken(jwt);
    return token?.isKombit == true;
  }

  logout() {
    localStorage.removeItem(this.LOCAL_STORAGE_JWT_LOCATION);
  }

  public isLoggedIn() {
    const exp = this.getExpiration();
    const now = moment();
    return now.isBefore(exp);
  }

  getExpiration() {
    const jwt = localStorage.getItem(this.LOCAL_STORAGE_JWT_LOCATION);

    if (!jwt) {
      return moment(0);
    }

    const decoded_jwt = this.getDecodedAccessToken(jwt);
    if (decoded_jwt.exp) {
      return moment.unix(decoded_jwt.exp);
    }

    return moment.unix(0);
  }

  getDecodedAccessToken(token: string): any {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (Error) {
      console.log('Tried to decode jwt but failed? ', Error);
      return null;
    }
  }
}
