import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OrganisationResponse } from '../../organisation.model';

@Component({
  selector: 'tr[app-organisation-row]',
  templateUrl: './organisation-row.component.html',
  styleUrls: ['./organisation-row.component.scss'],
})
export class OrganisationRowComponent implements OnInit {
  @Input() organisation: OrganisationResponse;
  @Output() deleteOrganisation = new EventEmitter();

  constructor(public translate: TranslateService, private router: Router) {
    translate.use('da');
  }
  ngOnInit(): void {}

  clickDelete() {
    this.deleteOrganisation.emit(this.organisation.id);
  }

  navigateToEditPage() {
    this.router.navigate(['organisation-edit', this.organisation.id]);
  }
}
