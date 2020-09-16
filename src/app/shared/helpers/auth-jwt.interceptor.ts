import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // If we're not calling the baseurl skip this. Is there a better way?
        if (req.url.indexOf(environment.baseUrl) != 0) {
            return next.handle(req);
        }

        const idToken = localStorage.getItem('id_token');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken),
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
