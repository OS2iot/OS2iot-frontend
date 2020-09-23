import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { of } from 'rxjs/internal/observable/of';

export interface AuthResponseData {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private URL = 'auth/login';

  constructor(private http: HttpClient) {}

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

  private setSession(jwt: string) {
    localStorage.setItem('id_token', jwt);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn() {
    const exp = this.getExpiration();
    const now = moment();
    return now.isBefore(exp);
  }

  getExpiration() {
    const jwt = localStorage.getItem('id_token');

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
