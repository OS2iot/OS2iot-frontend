import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If we're not calling the baseurl skip this. Is there a better way?
    if (req.url.indexOf(environment.baseUrl) != 0) {
      console.warn(`Skip adding Bearer since we're not calling baseUrl ... URL: '${req.url}'`);
      return next.handle(req);
    }

    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
