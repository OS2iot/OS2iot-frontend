import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    constructor(private titleService: Title, private translate: TranslateService) {}

    ngOnInit(): void {
        this.translate.get(['TITLE.USER'])
        .subscribe(translations => {
          this.titleService.setTitle(translations['TITLE.USER']);
        });
    }

    ngOnChanges(): void {}
}
