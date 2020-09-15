import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { RestService } from '@shared/services/rest.service';
import { throwError } from 'rxjs';

interface AuthResponseData {
  sub: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('http://[::1]:3000/api/v1/auth/login',
      {
        email: email,
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