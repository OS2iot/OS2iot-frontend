import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { UpdateUserOrgFromFrontend, UpdateUserOrgsDto, UserResponse } from "@app/admin/users/user.model";
import { UserService } from "@app/admin/users/user.service";
import { CurrentUserInfoResponse } from "@auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-user-page",
    templateUrl: "./user-page.component.html",
    styleUrls: ["./user-page.component.scss"],
})
export class UserPageComponent implements OnInit {
    public updateUserOrgs: UpdateUserOrgsDto = new UpdateUserOrgsDto();
    public updateUserOrgsFromFrontend: UpdateUserOrgFromFrontend = new UpdateUserOrgFromFrontend();
    public organisationSubscription: Subscription;
    public formFailedSubmit = false;
    public backButtonTitle: string;
    public errorFields: string[];
    public errorMessages: unknown;
    public title: string;
    public awaitingConfirmation: boolean;
    public requestOrganizationsList: Organisation[];
    public requestedUserOrganizations: Organisation[];
    public checkForNoUserOrganizations = false;
    public checkForRemainingOrganizations = false;
    public userInfo: CurrentUserInfoResponse;
    public pressed = false;
    public organisationsFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredOrganisations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);
    private onDestroy = new Subject<void>();

    constructor(
        private userService: UserService,
        private translate: TranslateService,
        private organizationService: OrganisationService,
        private sharedService: SharedVariableService,
        private errorMessageService: ErrorMessageService,
        private sharedVariableService: SharedVariableService
    ) {}

    ngOnInit(): void {
        this.userInfo = this.sharedService.getUserInfo();
        const hasSomePermission = this.sharedVariableService.getHasAnyPermission();

        this.userService.getOneSimple(this.userInfo.user.id).subscribe((response: UserResponse) => {
            // When used as user-page, check for users organizations so it's only possible to apply not already joined organizations
            this.requestedUserOrganizations = response.requestedOrganizations;
            if (this.userInfo.organizations.length > 0) {
                this.compareRequestedAndAlreadyJoinedOrganizations(
                    this.requestedUserOrganizations,
                    this.userInfo.organizations
                );
            }

            if (this.requestedUserOrganizations.length === 0) {
                this.checkForNoUserOrganizations = true;
            }

            this.awaitingConfirmation = response.awaitingConfirmation;
            if (!this.awaitingConfirmation && hasSomePermission) {
                this.translate.get("GEN.BACK").subscribe(translation => (this.backButtonTitle = translation));
            }
            this.translate.get("USER_PAGE.USER_PAGE").subscribe(translation => {
                this.title = translation;
            });

            this.getOrganisations();
        });

        this.organisationsFilterCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
            this.filterOrganisations();
        });
    }
    private filterOrganisations() {
        if (!this.requestOrganizationsList) {
            return;
        }
        // get the search keyword
        let search = this.organisationsFilterCtrl?.value?.trim();
        if (!search) {
            this.filteredOrganisations.next(this.requestOrganizationsList.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        const filtered = this.requestOrganizationsList.filter(org => {
            return org.name.toLocaleLowerCase().indexOf(search) > -1;
        });
        this.filteredOrganisations.next(filtered);
    }

    public compareRequestedAndAlreadyJoinedOrganizations(
        requestedOrganizations: Organisation[],
        alreadyJoinedOrganizations: Organisation[]
    ) {
        alreadyJoinedOrganizations.forEach(actOrg => {
            if (!requestedOrganizations.find(org => org.id === actOrg.id)) {
                this.requestedUserOrganizations.push(actOrg);
            }
        });
    }

    public compare(o1: Organisation | undefined, o2: Organisation | undefined): boolean {
        return o1?.id === o2?.id;
    }

    public getOrganisations() {
        this.organisationSubscription = this.organizationService.getMinimalNoPerm().subscribe(orgs => {
            this.requestOrganizationsList = orgs.data;
            this.requestOrganizationsList = this.filterChosenOrganizations(
                this.requestedUserOrganizations,
                this.requestOrganizationsList
            );
            this.filteredOrganisations.next(this.requestOrganizationsList.slice());
        });
    }

    public filterChosenOrganizations(
        requestedUserOrganizations: Organisation[],
        allOrganizations: Organisation[]
    ): Organisation[] {
        const filteredChosenOrganizations: Organisation[] = [];

        allOrganizations.forEach(allOrg => {
            if (!requestedUserOrganizations.find(org => org.id === allOrg.id)) {
                filteredChosenOrganizations.push(allOrg);
            }
        });
        if (filteredChosenOrganizations.length > 0) {
            this.checkForRemainingOrganizations = true;
        } else {
            this.checkForRemainingOrganizations = false;
        }

        return filteredChosenOrganizations;
    }

    public mapToDto(body: UpdateUserOrgFromFrontend) {
        this.updateUserOrgs.requestedOrganizationIds = [];
        if (body.requestedOrganizations) {
            body.requestedOrganizations.forEach(organization => {
                this.updateUserOrgs.requestedOrganizationIds.push(organization.id);
            });
        } else {
            this.formFailedSubmit = true;
        }
    }

    onSubmit(): void {
        if (this.pressed === false) {
            this.pressed = true;

            this.resetErrors();
            this.mapToDto(this.updateUserOrgsFromFrontend);
            this.userService.updateUserOrgs(this.updateUserOrgs).subscribe(
                () => {
                    window.location.reload();
                    this.pressed = false;
                },
                (error: HttpErrorResponse) => {
                    this.handleError(error);
                    this.formFailedSubmit = true;
                    this.pressed = false;
                }
            );
        }
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
