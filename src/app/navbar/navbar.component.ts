import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '@shared/form/form-body-application/form-body-application.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public user: User;
    isLoginMode = true;
    faBroadcastTower = faBroadcastTower;


    constructor(
        private authService: AuthService,
        public translate: TranslateService,
        private router: Router,
    ) {
        translate.use('da');
    }

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('auth');
    }

    isLoggedIn() {
        return this.authService.isLoggedIn()
    }
}
