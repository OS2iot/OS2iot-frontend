import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  faBroadcastTower,
  faSlidersH,
  faNetworkWired,
  faSignOutAlt,
  faSignInAlt,
  faUser,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService, CurrentUserInfoResponse } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { LoggedInService } from '@shared/services/loggedin.service';
import { User } from '@shared/components/forms/form-body-application/form-body-application.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  isLoginMode = true;
  user: User;
  faBroadcastTower = faBroadcastTower;
  userInfo: CurrentUserInfoResponse;
  faSlidersH = faSlidersH;
  faNetworkWired = faNetworkWired;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUser = faUser;
  faQuestionCircle = faQuestionCircle;
  imagePath = '../../assets/images/os2iot.png ';

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router,
    private sharedVariableService: SharedVariableService,
    private loggedInService: LoggedInService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('auth');
    this.loggedInService.emitChange(false);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasSomePermissions(): boolean {
    return this.sharedVariableService.getHasAnyPermission();
  }

  getUsername(): string {
    return this.sharedVariableService.getUsername();
  }

  isLoggedInWithKombit() {
    return this.authService.isLoggedInWithKombit();
  }

  hasEmail(): string {
    this.userInfo = this.sharedVariableService.getUserInfo();
    return this.userInfo?.user?.email;
  }

  public goToHelp() {
    window.open('https://os2iot.os2.eu/');
  }

  getKombitLogoutUrl() {
    const jwt = this.authService.getJwt();
    if (this.authService.isLoggedInWithKombit()) {
      return `${environment.baseUrl}auth/kombit/logout?secret_token=${jwt}`;
    } else {
      return '';
    }
  }
}
