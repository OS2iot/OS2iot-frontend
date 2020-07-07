import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AlertService } from './alert.service';
import { Alert } from 'src/app/models/alert';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

interface IHttpOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

@Injectable()
export class RestService {
    constructor(
        private http: HttpClient,
        private alertService: AlertService,
        private router: Router
    ) {
        this.options = {
            responseType: 'json',
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
    }

    private readonly options: IHttpOptions;
    private baseUrl = environment.baseUrl;

    public get(
        url: string,
        params?: { [index: string]: any },
        id?: string | number
    ): Observable<any> {
        const resourceUrl = this.createResourceUrl(url, id);
        const httpParams = this.buildParams(params);

        return this.http
            .get(resourceUrl, { ...this.options, params: httpParams })
            .pipe(
                tap((_) => this.log({ message: 'Success', type: 'success' })),
                catchError(this.handleError<any>('get', []))
            );
    }

    public create(
        url: string,
        object: any,
        params?: { [index: string]: any }
    ): Observable<any> {
        const httpParams = this.buildParams(params);

        return this.http
            .post(this.baseUrl + url, object, {
                ...this.options,
                params: httpParams,
            })
            .pipe(
                tap((_) =>
                    this.log({
                        message: 'Succesfully created',
                        type: 'success',
                    })
                ),
                tap((_) =>
                    setTimeout(() => {
                        this.router.navigateByUrl('/mine-applikationer')
                    }, 500)
                ),
                catchError(this.handleError<any>('create', []))
            );
    }

    public createAt(
        url: string,
        object: any,
        params?: { [index: string]: any }
    ): Observable<any> {
        const httpParams = this.buildParams(params);
        const path = this.createResourceUrl(this.baseUrl + url);

        return this.http
            .post(path, object, { ...this.options, params: httpParams })
            .pipe(
                tap((_) =>
                    this.log({
                        message: 'Succesfully created',
                        type: 'success',
                    })
                ),
                catchError(this.handleError<any>('createAt', []))
            );
    }

    public replace(
        url: string,
        object: any,
        id?: string | number
    ): Observable<any> {
        const resourceUrl = this.createResourceUrl(this.baseUrl + url, id);
        return this.http.put(resourceUrl, object, this.options).pipe(
            tap((_) =>
                this.log({ message: 'Succesfully updated', type: 'success' })
            ),
            catchError(this.handleError<any>('replace', []))
        );
    }

    public update(
        url: string,
        object: any,
        id?: string | number,
        params?: { [index: string]: any }
    ): Observable<any> {
        const resourceUrl = this.createResourceUrl(this.baseUrl + url, id);
        const httpParams = this.buildParams(params);

        return this.http
            .patch(resourceUrl, object, {
                ...this.options,
                params: httpParams,
            })
            .pipe(
                tap((_) =>
                    this.log({
                        message: 'Succesfully patched',
                        type: 'success',
                    })
                ),
                catchError(this.handleError<any>('patch', []))
            );
    }

    public delete(
        url: string,
        id: string | number,
        params?: { [index: string]: any },
        options?: any
    ): Observable<any> {
        const resourceUrl = this.createResourceUrl(this.baseUrl + url, id);
        const httpParams = this.buildParams(params);
        const httpOptions = options
            ? Object.assign({}, this.options, options)
            : this.options;

        return this.http
            .delete(resourceUrl, {
                ...httpOptions,
                params: httpParams,
            })
            .pipe(
                tap((_) =>
                    this.log({
                        message: 'Succesfully deleted',
                        type: 'success',
                    })
                ),
                catchError(this.handleError<any>('delete', []))
            );
    }

    public post(
        url: string,
        body: any,
        params?: { [index: string]: any }
    ): Observable<any> {
        const httpParams = this.buildParams(params);

        return this.http
            .post(this.baseUrl + url, body, {
                ...this.options,
                params: httpParams,
            })
            .pipe(
                tap((_) =>
                    this.log({ message: 'Succesfully added', type: 'success' })
                ),
                catchError(this.handleError<any>('post', []))
            );
    }

    private createResourceUrl(url: string, id?: string | number) {
        let resourceUrl = this.baseUrl + url;

        if (id != null) {
            resourceUrl += '/' + id;
        }

        return resourceUrl;
    }

    private buildParams(params?: { [index: string]: any }): HttpParams {
        let httpParams = new HttpParams();
        if (!params) {
            return httpParams;
        }

        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                if (Array.isArray(params[param])) {
                    for (const p of params[param]) {
                        httpParams = httpParams.append(param, p);
                    }
                } else {
                    httpParams = httpParams.append(param, params[param]);
                }
            }
        }

        return httpParams;
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log({
                message: `${operation} failed: ${error.message}`,
                type: 'danger',
            });

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Use the AlertService to notify of the request*/
    private log(alert: Alert) {
        this.alertService.add(alert);
    }
}
