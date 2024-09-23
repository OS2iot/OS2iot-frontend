import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { CsrfHeaderName } from "@shared/constants/csrf-constants";
import { Observable, of } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseUrl;
  private tokenUrl = "csrf/token";
  private csrfToken: string;
  constructor(private httpClient: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.csrfToken || req.url.endsWith(this.tokenUrl)) {
      const cloned = req.clone({
        headers: req.headers.set(CsrfHeaderName, this?.csrfToken ?? ""),
        withCredentials: req.withCredentials || ["POST", "PUT", "DELETE"].includes(req.method),
      });

      return next.handle(cloned);
    }

    // If no CSRF token, fetch it first
    return this.fetchCsrfToken().pipe(
      switchMap(() => {
        return next.handle(req);
      }),
      catchError(err => {
        console.error("CSRF token fetch failed", err);
        return next.handle(req);
      })
    );
  }

  private fetchCsrfToken(): Observable<string> {
    return this.httpClient.get<{ token: string }>(this.baseUrl + this.tokenUrl, { withCredentials: true }).pipe(
      tap(response => {
        this.csrfToken = response.token;
      }),
      switchMap(response => of(response.token))
    );
  }
}
