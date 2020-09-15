import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { RestService } from '@shared/services/rest.service';
import { throwError, Observable } from 'rxjs';

interface AuthResponseData {
  sub: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'auth/login'

  constructor(private http: HttpClient, private restService: RestService) { }

  signup(username: string, password: string): Observable<any> {
    return this.restService.post(this.URL,
      {
        username: username,
        password: password
      }
    )
  }
}



// .pipe(catchError(errorRes => {
//   let errorMessage = "Der skete en ukendt fejl";
//   if (!errorRes.error) {
//     return throwError('error dot error');
//   }
//   switch (errorRes.error.statusCode) {
//     case '401': errorMessage = errorRes.error.message;
//   }
//   return throwError(errorMessage);

// }));