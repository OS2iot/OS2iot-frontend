import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

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
        const observable = this.http
            .post<AuthResponseData>(this.baseUrl + this.URL, {
                username: username,
                password: password,
            })
            .pipe(
                catchError((errorRes) => {
                    console.log('Got ' + JSON.stringify(errorRes));
                    const errorMessage = errorRes.error.message;
                    return throwError(errorMessage);
                })
            );

        observable.subscribe((res) => {
            console.log('Got ' + JSON.stringify(res));
            this.setSession(res.accessToken);
        });

        return observable;
    }

    private setSession(jwt: string) {
        localStorage.setItem('id_token', jwt);
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        const jwt = localStorage.getItem('id_token');

        if (!jwt) {
            return moment(0);
        }

        const decoded_jwt = this.getDecodedAccessToken(jwt);
        if (decoded_jwt.exp) {
            return moment(decoded_jwt.exp);
        }
        
        return moment(0);
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
