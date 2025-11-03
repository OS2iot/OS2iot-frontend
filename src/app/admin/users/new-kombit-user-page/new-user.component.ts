import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { CreateNewKombitUserDto, CreateNewKombitUserFromFrontend } from "@app/admin/users/user.model";
import { UserService } from "@app/admin/users/user.service";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.scss"],
  standalone: false,
})
export class NewUserComponent implements OnInit {
  public organisationSubscription: Subscription;
  public userSubscription: Subscription;
  public organisations: Organisation[];
  public formFailedSubmit = false;
  public errorFields: string[];
  public errorMessages: any[];
  public createNewKombitUserFromFrontend: CreateNewKombitUserFromFrontend = new CreateNewKombitUserFromFrontend();
  public organisationsFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public filteredOrganisations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);
  public errorMessage: string;
  private onDestroy = new Subject<void>();

  constructor(
    private organisationService: OrganisationService,
    private sharedService: SharedVariableService,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    if (history.state.fromKombit) {
      this.translate.get(["NEW_USER.FIRST_LOGIN", "USERS.EMAIL", "NAV.ORGANISATIONS", "NAV.BACK", "USERS.SAVE"]);

      this.getOrganisations();

      this.organisationsFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.filterOrganisations();
      });
    } else {
      this.router.navigate(["/not-found"]);
    }
  }

  onSubmit(): void {
    this.resetErrors();

    const createNewKombitUserDTO = this.mapToDto(this.createNewKombitUserFromFrontend);

    this.userService.updateNewKombit(createNewKombitUserDTO).subscribe({
      next: () => {
        this.router.navigate(["/applications"]);
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.formFailedSubmit = true;
      },
    });
  }

  public compare(o1: Organisation | undefined, o2: Organisation | undefined): boolean {
    return o1?.id === o2?.id;
  }

  public getOrganisations() {
    this.organisations = this.sharedService.getOrganizationInfo();
    if (!this.organisations) {
      this.filteredOrganisations.next(this.organisations.slice());
    } else {
      this.organisationSubscription = this.organisationService.getMinimalNoPerm().subscribe(orgs => {
        this.organisations = orgs.data;
        this.filteredOrganisations.next(this.organisations.slice());
      });
    }
  }

  handleError(error: HttpErrorResponse) {
    if (typeof error.error?.error === "string" && typeof error.error?.message === "string") {
      this.errorMessage = error.error?.message;
    } else {
      const errors = this.errorMessageService.handleErrorMessageWithFields(error);
      this.errorFields = errors.errorFields;
      this.errorMessages = errors.errorMessages;
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

    const filtered = this.organisations.filter(org => {
      return org.name.toLocaleLowerCase().indexOf(search) > -1;
    });

    this.filteredOrganisations.next(filtered);
  }

  private mapToDto(frontendModel: CreateNewKombitUserFromFrontend): CreateNewKombitUserDto {
    const createNewKombitUserDTO = new CreateNewKombitUserDto();
    createNewKombitUserDTO.email = frontendModel.email;
    createNewKombitUserDTO.requestedOrganizationIds = [];

    frontendModel.requestedOrganizations.forEach(organization => {
      createNewKombitUserDTO.requestedOrganizationIds.push(organization.id);
    });

    return createNewKombitUserDTO;
  }

  private resetErrors() {
    this.errorFields = [];
    this.errorMessages = undefined;
    this.formFailedSubmit = false;
  }
}
