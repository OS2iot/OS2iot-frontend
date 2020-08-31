import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public user: User;

    constructor(
        public translate: TranslateService
    ) {
        translate.use('da');
    }
}
