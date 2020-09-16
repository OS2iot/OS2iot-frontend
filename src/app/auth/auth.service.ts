import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { RestService } from '@shared/services/rest.service';
import { throwError, Observable } from 'rxjs';

export interface AuthResponseData {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'auth/login'

  constructor(private http: HttpClient, private restService: RestService) { }

  signup(username: string, password: string): Observable<AuthResponseData> {
    return this.restService.post(this.URL,
      {
        username: username,
        password: password
      }
    ).pipe(catchError(errorRes => {
      const errorMessage = errorRes.error.message;
      ;

      return throwError(errorMessage);
    }));
  }

  //global-admin@os2iot.dk
  //hunter2

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.restService.post(this.URL,
      {
        username: username,
        password: password
      }
    ).pipe(catchError(errorRes => {
      const errorMessage = errorRes.error.message;

      return throwError(errorMessage);

    }));
  }
}

