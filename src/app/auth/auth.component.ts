import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  isLoginMode = true;
  isLoading = false;
  error: string = null;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    let authObs: Observable<AuthResponseData> = this.authService.login(username, password);

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
    }, (errorMessage: HttpErrorResponse) => {
      console.log(errorMessage);
      /* this.error = errorMessage;
      this.isLoading = false; */
    });

    form.reset();

    this.router.navigateByUrl('/my-applications')

  }
}

