import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { CsrfHeaderName, IgnoredCsrfMethods } from "@shared/constants/csrf-constants";
import { Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseUrl;
  private tokenUrl = "csrf/token";
  private csrfToken: string;
  constructor(private httpClient: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ignoreMethod = IgnoredCsrfMethods.includes(req.method);

    let requestWithCredentials = req.clone({
      withCredentials: req.withCredentials || !ignoreMethod,
    });

    if (ignoreMethod) {
      return next.handle(requestWithCredentials);
    }

    if (this.csrfToken) {
      const reqWithCsrfToken = requestWithCredentials.clone({
        headers: requestWithCredentials.headers.set(CsrfHeaderName, this.csrfToken),
      });

      return next.handle(reqWithCsrfToken);
    }

    // If no CSRF token, fetch it first
    return this.httpClient.get<{ token: string }>(this.baseUrl + this.tokenUrl, { withCredentials: true }).pipe(
      switchMap(response => {
        this.csrfToken = response.token;
        return next.handle(requestWithCredentials);
      }),
      catchError(err => {
        console.error("CSRF token fetch failed", err);
        return next.handle(requestWithCredentials);
      })
    );
  }
}
