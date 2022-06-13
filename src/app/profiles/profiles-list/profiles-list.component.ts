import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private meService: MeService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.LORAWAN-PROFILE'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.LORAWAN-PROFILE']);
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

}
