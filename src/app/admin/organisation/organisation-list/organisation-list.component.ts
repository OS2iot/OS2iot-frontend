import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss'],
})
export class OrganisationListComponent implements OnInit {
  
  constructor(public translate: TranslateService, private titleService: Title) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.ORGANIZATION'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.ORGANIZATION']);
      });
   }
}
