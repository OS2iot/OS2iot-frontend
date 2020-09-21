import { Component, OnInit } from '@angular/core';

import { OrganisationService } from 'src/app/shared/services/organisation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackButton } from '@app/models/back-button';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Organisation } from '../organisation.model';

@Component({
  selector: 'app-organisation-edit',
  templateUrl: './organisation-edit.component.html',
  styleUrls: ['./organisation-edit.component.scss'],
})
export class OrganisationEditComponent implements OnInit {
  organisation = new Organisation();
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/organisations' };
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private organisationService: OrganisationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate
      .get(['NAV.ORGANISATIONS', 'FORM.EDIT-ORGANISATION', 'ORGANISATION.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.ORGANISATIONS'];
        this.title = translations['FORM.EDIT-ORGANISATION'];
        this.submitButton = translations['ORGANISATION.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('org-id');
    if (this.id > 0) {
      this.getOrganisation(this.id);
    }
  }

  private getOrganisation(id: number) {
    this.subscription = this.organisationService
      .getOne(id)
      .subscribe((response) => {
        this.organisation = response;
      });
  }

  private create(): void {
    this.organisationService.post(this.organisation).subscribe(
      (response) => {
        console.log(response);
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
      }
    );
  }

  private update(): void {
    this.organisationService.put(this.organisation, this.id).subscribe(
      (response) => {
        this.routeBack();
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  onSubmit(): void {
    if (this.organisation.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (error.error?.message?.length > 0) {
      error.error.message[0].children.forEach((err) => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(
          Object.values(err.constraints)
        );
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
  }

  routeBack(): void {
    this.location.back();
  }
}
