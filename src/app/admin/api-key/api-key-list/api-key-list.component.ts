import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-api-key-list',
  templateUrl: './api-key-list.component.html',
  styleUrls: ['./api-key-list.component.scss'],
})
export class ApiKeyListComponent implements OnInit {
  @Input() organisationId: number;

  constructor(
    public translate: TranslateService,
    private titleService: Title,
    private globalService: SharedVariableService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.API-KEY']).subscribe((translations) => {
      this.titleService.setTitle(translations['TITLE.API-KEY']);
    });
    this.organisationId = this.globalService.getSelectedOrganisationId();
  }
}
