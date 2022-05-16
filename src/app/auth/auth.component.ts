import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { LoggedInService } from '@shared/services/loggedin.service';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  isLoginMode = true;
  isLoading = false;
  isKombit = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private loggedinService: LoggedInService,
    private sharedVariableService: SharedVariableService,
    private userMinimalService: UserMinimalService
  ) {}

  ngOnInit(): void {}

  getKombitLoginUrl() {
    const frontpage = encodeURI(window.location.origin + '/applications');
    return `${environment.baseUrl}auth/kombit/login?redirect=${frontpage}`;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  async success() {
    await this.sharedVariableService.setUserInfo();
    await this.sharedVariableService.setOrganizationInfo();
    this.userMinimalService.setUserMinimalList();
    this.isLoading = false;
    this.loggedinService.emitChange(true);
    this.router.navigateByUrl('/applications');
  }

  fail() {
    this.isLoading = false;
    this.errorFields = ['username', 'password'];
    this.errorMessages = ['Login failed. Wrong username or password.'];
    this.formFailedSubmit = true;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(username, password).subscribe(
      (x: any) => {
        console.log(x);
        if (x.accessToken) {
          this.success();
        } else {
          this.fail();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
