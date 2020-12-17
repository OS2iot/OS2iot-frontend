import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss'],
})
export class OrganisationListComponent implements OnInit {
  
  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void { }
}
