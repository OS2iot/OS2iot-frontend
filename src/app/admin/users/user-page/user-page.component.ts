import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import { UpdateUserOrgsDto, UserResponse } from '@app/admin/users/user.model';
import { UserService } from '@app/admin/users/user.service';
import { CurrentUserInfoResponse } from '@auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from '@shared/error-message.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  public updateUserOrgs: UpdateUserOrgsDto = new UpdateUserOrgsDto();
  public organisationSubscription: Subscription;
  public formFailedSubmit = false;
  public backButtonTitle: string;
  public errorFields: string[];
  public errorMessages: unknown;
  public title: string;
  public awaitingConfirmation: boolean;
  public organizations: Organisation[];
  public userOrganizations: Organisation[];
  public userInfo: CurrentUserInfoResponse;
  public organisationsFilterCtrl: FormControl = new FormControl();
  public filteredOrganisations: ReplaySubject<
    Organisation[]
  > = new ReplaySubject<Organisation[]>(1);
  private onDestroy = new Subject<void>();

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private organizationService: OrganisationService,
    private sharedService: SharedVariableService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.translate.get([
      'USER_PAGE.AWAITING_CONFIRMATION',
      'USER_PAGE.APPLY_ORGANISATIONS',
      'USER_PAGE.APPLIED_ORGANISATIONS',
      'USER_PAGE.QUESTION_APPLY_ORGANISAIONS',
      'USER_PAGE.NO_APPLIED_ORGS',
      'USER_PAGE.NO_ORGS',
    ]);

    this.userInfo = this.sharedService.getUserInfo();
    this.userService
      .getOneSimple(this.userInfo.user.id)
      .subscribe((response: UserResponse) => {
        this.userOrganizations = response.organizations;

        this.awaitingConfirmation = response.awaitingConfirmation;
        if (!this.awaitingConfirmation) {
          this.translate
            .get('GEN.BACK')
            .subscribe((translation) => (this.backButtonTitle = translation));
        }
        this.translate.get('USER_PAGE.USER_PAGE').subscribe((translation) => {
          this.title = translation;
        });
      });

    this.getOrganisations();
    this.organisationsFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterOrganisations();
      });
  }
  private filterOrganisations() {
    if (!this.organizations) {
      return;
    }
    // get the search keyword
    let search = this.organisationsFilterCtrl?.value?.trim();
    if (!search) {
      this.filteredOrganisations.next(this.organizations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const filtered = this.organizations.filter((org) => {
      return org.name.toLocaleLowerCase().indexOf(search) > -1;
    });
    this.filteredOrganisations.next(filtered);
  }

  public compare(
    o1: Organisation | undefined,
    o2: Organisation | undefined
  ): boolean {
    return o1?.id === o2?.id;
  }

  public getOrganisations() {
    this.organisationSubscription = this.organizationService
      .getMultipleNoReq()
      .subscribe((orgs) => {
        this.organizations = orgs.data;
        this.organizations = this.filterChosenOrganizations(
          this.userOrganizations,
          this.organizations
        );
        this.filteredOrganisations.next(this.organizations.slice());
      });
  }

  public filterChosenOrganizations(
    userOrganizations: Organisation[],
    allOrganizations: Organisation[]
  ): Organisation[] {
    const filteredChosenOrganizations: Organisation[] = [];

    allOrganizations.forEach((allOrg) => {
      if (!userOrganizations.find((org) => org.id === allOrg.id)) {
        filteredChosenOrganizations.push(allOrg);
      }
    });

    return filteredChosenOrganizations;
  }

  onSubmit(): void {
    this.resetErrors();
    this.organizationService.updateUserOrgs(this.updateUserOrgs).subscribe(
      () => {
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }
  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }
  handleError(error: HttpErrorResponse) {
    const errors = this.errorMessageService.handleErrorMessageWithFields(error);
    this.errorFields = errors.errorFields;
    this.errorMessages = errors.errorMessages;
  }
}
