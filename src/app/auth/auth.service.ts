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
      let errorMessage = "Der skete en ukendt fejl";
      if (!errorRes.error || errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'MESSAGE.NAME-INVALID-OR-ALREADY-IN-USE': errorMessage = 'Navnet er invalig eller bruger er allerede i brug';
      }
      throw new Error(errorMessage);
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
      let errorMessage = "Der skete en ukendt fejl";
      if (!errorRes.error || errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.statusCode) {
        case 'MESSAGE.NAME-INVALID-OR-ALREADY-IN-USE': errorMessage = 'Navnet er invalig eller bruger er allerede i brug';
      }
      return throwError(errorMessage);

    }));
  }
}

