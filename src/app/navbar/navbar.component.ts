import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  faBroadcastTower,
  faSlidersH,
  faNetworkWired,
  faSignOutAlt,
  faSignInAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  isLoginMode = true;
  faBroadcastTower = faBroadcastTower;
  faSlidersH = faSlidersH;
  faNetworkWired = faNetworkWired;
  faSignOutAlt = faSignOutAlt;
  faSignInAlt = faSignInAlt;
  faUser = faUser;

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private router: Router,
    private sharedVariableService: SharedVariableService
  ) {
    translate.use('da');
  }

  ngOnInit(): void { }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('auth');
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasSomePermissions(): boolean {
    return this.sharedVariableService.getHasAnyPermission()
  }

  getUsername(): String {
    return this.sharedVariableService.getUsername();
  }

  isLoggedInWithKombit() {
    return this.authService.isLoggedInWithKombit();
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
