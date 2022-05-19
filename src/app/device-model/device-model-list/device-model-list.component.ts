import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-device-model-list',
  templateUrl: './device-model-list.component.html',
  styleUrls: ['./device-model-list.component.scss']
})
export class DeviceModelListComponent implements OnInit {
  canEdit: boolean;

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    private meService: MeService
  ) {
    translate.use('da');
   }

  ngOnInit(): void {
    this.translate.get(['TITLE.DEVICEMODEL'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.DEVICEMODEL']);
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

}
