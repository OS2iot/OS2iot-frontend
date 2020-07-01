import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RestService } from '../modules/shared/services/rest.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public users: User[];
    private userSubscription: Subscription;

    constructor(
        private restService: RestService,
        public translate: TranslateService
    ) {
        translate.setDefaultLang('en');
        translate.use('da');
    }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.userSubscription = this.restService
            .get('http://localhost:3000/api/v1/users')
            .subscribe((users) => {
                this.users = users;
                console.log('users:', this.users);
            });
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.userSubscription.unsubscribe();
    }
}
