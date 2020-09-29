import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { OrganisationResponse } from '../organisation.model';
import { BackButton } from '@shared/models/back-button.model';

@Component({
  selector: 'app-organisation-detail',
  templateUrl: './organisation-detail.component.html',
  styleUrls: ['./organisation-detail.component.scss'],
})
export class OrganisationDetailComponent implements OnInit {
  organisation: OrganisationResponse;
  applications: Application[];
  public backButton: BackButton = {
    label: '',
    routerLink: '/admin/organisations',
  };
  id: number;
  subscription: Subscription;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.id = +this.route.snapshot.paramMap.get('org-id');
    if (this.id > 0) {
      this.getOrganisation(this.id);
    }
    this.translate.get(['NAV.ORGANISATIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.ORGANISATIONS'];
      });
  }

  private getOrganisation(id: number) {
    this.subscription = this.organisationService
      .getOne(id)
      .subscribe((response) => {
        this.organisation = response;
        this.applications = response.applications;
      });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.getOrganisation(this.id);
      }
    });
  }
}
