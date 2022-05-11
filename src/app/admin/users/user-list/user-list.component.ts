import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { MeService } from '@shared/services/me.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    canEdit: boolean;
    constructor(private titleService: Title, private translate: TranslateService, private meService: MeService) {}

    ngOnInit(): void {
        this.translate.get(['TITLE.USER'])
        .subscribe(translations => {
          this.titleService.setTitle(translations['TITLE.USER']);
        });
        this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
    }
}
