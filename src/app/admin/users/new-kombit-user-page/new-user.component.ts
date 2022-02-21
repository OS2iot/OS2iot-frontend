import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Organisation } from '@app/admin/organisation/organisation.model';
import { OrganisationService } from '@app/admin/organisation/organisation.service';
import {
  CreateNewKombitUserDto,
  CreateNewKombitUserFromFrontend,
} from '@app/admin/users/user.model';
import { UserService } from '@app/admin/users/user.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from '@shared/error-message.service';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  public organisationSubscription: Subscription;
  public createNewKombitUserDto: CreateNewKombitUserDto = new CreateNewKombitUserDto();
  public userSubscription: Subscription;
  public organisations: Organisation[];
  public formFailedSubmit = false;
  public errorFields: string[];
  public errorMessages: unknown;
  public createNewKombitUserFromFrontend: CreateNewKombitUserFromFrontend = new CreateNewKombitUserFromFrontend();
  public organisationsFilterCtrl: FormControl = new FormControl();
  public filteredOrganisations: ReplaySubject<
    Organisation[]
  > = new ReplaySubject<Organisation[]>(1);
  private onDestroy = new Subject<void>();

  constructor(
    private organisationService: OrganisationService,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    if (history.state.code === 200) {
      this.translate.get([
        'NEW_USER.FIRST_LOGIN',
        'USERS.EMAIL',
        'NAV.ORGANISATIONS',
        'NAV.BACK',
        'USERS.SAVE',
      ]);

      this.getOrganisations();

      this.organisationsFilterCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.filterOrganisations();
        });
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  private filterOrganisations() {
    if (!this.organisations) {
      return;
    }
    // get the search keyword
    let search = this.organisationsFilterCtrl?.value?.trim();
    if (!search) {
      this.filteredOrganisations.next(this.organisations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    const filtered = this.organisations.filter((org) => {
      return org.name.toLocaleLowerCase().indexOf(search) > -1;
    });
    this.filteredOrganisations.next(filtered);
  }

  onSubmit(): void {
    this.resetErrors();
    this.mapToDto(this.createNewKombitUserFromFrontend);
    this.userService.updateNewKombit(this.createNewKombitUserDto).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      }
    );
  }

  public mapToDto(body: CreateNewKombitUserFromFrontend) {
    this.createNewKombitUserDto.email = body.email;
    this.createNewKombitUserDto.requestedOrganizationIds = [];
    body.requestedOrganizations.forEach((organization) => {
      this.createNewKombitUserDto.requestedOrganizationIds.push(
        organization.id
      );
    });
  }

  public compare(
    o1: Organisation | undefined,
    o2: Organisation | undefined
  ): boolean {
    return o1?.id === o2?.id;
  }

  public getOrganisations() {
    this.organisationSubscription = this.organisationService
      .getMultipleNoReq()
      .subscribe((orgs) => {
        this.organisations = orgs.data;
        this.filteredOrganisations.next(this.organisations.slice());
      });
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
