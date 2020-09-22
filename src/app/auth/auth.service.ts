import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { of } from 'rxjs/internal/observable/of';
import { Alert } from '@app/models/alert';
import { AlertService } from '@shared/services/alert.service';

export interface AuthResponseData {
    accessToken: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = environment.baseUrl;
    private URL = 'auth/login';

    constructor(private http: HttpClient, private alertService: AlertService) { }

    // global-admin@os2iot.dk
    // hunter2

    login(username: string, password: string) {
        const observable = this.http
            .post<AuthResponseData>(this.baseUrl + this.URL, {
                username: username,
                password: password,
            })
            .pipe(
                tap((_) => this.log({ message: 'Success', type: 'success' })),
                catchError(this.handleError<any>('get', []))
            );

        observable.subscribe((res) => {
            console.log('Got ' + JSON.stringify(res));
            this.setSession(res.accessToken);
        })

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


    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);

            this.log({
                message: `${operation} failed: ${error.message}`,
                type: 'danger',
            });

            return of(result as T);
        };
    }

    // Use the AlertService to notify of the request
    private log(alert: Alert) {
        this.alertService.add(alert);
    }
}
