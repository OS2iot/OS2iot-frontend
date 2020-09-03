import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { faBroadcastTower } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public user: User;
    faBroadcastTower = faBroadcastTower;

    constructor(
        public translate: TranslateService
    ) {
        translate.use('da');
    }
}
