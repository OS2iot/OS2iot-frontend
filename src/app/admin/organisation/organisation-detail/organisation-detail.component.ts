import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BackButton } from '@app/models/back-button';
import { QuickActionButton } from '@app/models/quick-action-button';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Application } from '@app/models/application';
import { ApplicationService } from '@shared/services/application.service';
import { OrganisationService } from '@shared/services/organisation.service';
import { OrganisationResponse } from '../organisation.model';

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
  public buttons: QuickActionButton[] = [
    {
      label: 'ORGANISATION.DELETE',
      type: 'delete',
    },
    {
      label: 'ORGANISATION.EDIT',
      type: 'edit',
    },
  ];
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
    this.id = +this.route.snapshot.paramMap.get('orgId');
    if (this.id > 0) {
      this.getOrganisation(this.id);
    }
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
