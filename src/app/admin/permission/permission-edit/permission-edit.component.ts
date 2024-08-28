import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ReplaySubject, Subject, Subscription } from "rxjs";
import { Location } from "@angular/common";
import { PermissionService } from "../permission.service";
import { PermissionRequest, PermissionType, PermissionTypes } from "../permission.model";
import { OrganisationResponse } from "../../organisation/organisation.model";
import { OrganisationService } from "../../organisation/organisation.service";
import { UserService } from "../../users/user.service";
import { UserResponse } from "../../users/user.model";
import { ApplicationService } from "@applications/application.service";
import { Application } from "@applications/application.model";
import { BackButton } from "@shared/models/back-button.model";
import { ErrorMessageService } from "@shared/error-message.service";
import { takeUntil } from "rxjs/operators";
import { MeService } from "@shared/services/me.service";

@Component({
    selector: "app-permission-edit",
    templateUrl: "./permission-edit.component.html",
    styleUrls: ["./permission-edit.component.scss"],
})
export class PermissionEditComponent implements OnInit, OnDestroy {
    permission = new PermissionRequest();
    isNotGlobalAdmin = true;
    public organisations: OrganisationResponse[];
    public users: UserResponse[];
    public applications: Application[];
    public errorMessage: string;
    public errorMessages: any;
    public errorFields: string[];
    public formFailedSubmit = false;
    public form: UntypedFormGroup;
    public backButton: BackButton = {
        label: "",
        routerLink: ["admin", "permissions"],
    };
    public title = "";
    public submitButton = "";
    public isEditMode = false;
    id: number;
    subscription: Subscription;
    organisationSubscription: Subscription;
    userSubscription: Subscription;
    applicationSubscription: Subscription;
    allowedLevels: PermissionTypes[] = [
        { type: PermissionType.OrganizationUserAdmin },
        { type: PermissionType.OrganizationApplicationAdmin },
        { type: PermissionType.OrganizationGatewayAdmin },
        { type: PermissionType.Read },
    ];

    public userMultiCtrl: UntypedFormControl = new UntypedFormControl();
    public userMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredUsersMulti: ReplaySubject<UserResponse[]> = new ReplaySubject<UserResponse[]>(1);

    public applicationMultiCtrl: UntypedFormControl = new UntypedFormControl();
    public applicationMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();
    public filteredApplicationsMulti: ReplaySubject<Application[]> = new ReplaySubject<Application[]>(1);

    public permissionLevelsCtrl: UntypedFormControl = new UntypedFormControl();

    /** Subject that emits when the component has been destroyed. */
    private _onDestroy = new Subject<void>();

    constructor(
        private translate: TranslateService,
        private route: ActivatedRoute,
        private permissionService: PermissionService,
        private organisationService: OrganisationService,
        private userService: UserService,
        private applicationService: ApplicationService,
        private location: Location,
        private errormEssageService: ErrorMessageService,
        private meService: MeService
    ) {}

    ngOnInit(): void {
        this.getOrganizations();
        this.getUsers();
        this.translate.use("da");
        this.translate.get(["NAV.PERMISSIONS", "FORM.EDIT-PERMISSION", "PERMISSION.SAVE"]).subscribe(translations => {
            this.backButton.label = translations["NAV.PERMISSIONS"];
            this.title = translations["FORM.EDIT-PERMISSION"];
            this.submitButton = translations["PERMISSION.SAVE"];
        });
        this.id = +this.route.snapshot.paramMap.get("permission-id");
        if (this.id > 0) {
            this.getPermission(this.id);
            this.isEditMode = true;
            this.permissionLevelsCtrl.disable();
            this.setBackButton();
        }

        this.userMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterUsersMulti();
        });

        this.applicationMultiFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterApplicationsMulti();
        });
    }

    private filterApplicationsMulti() {
        if (!this.applications) {
            return;
        }
        // get the search keyword
        let search = this.applicationMultiFilterCtrl.value;
        if (!search) {
            this.filteredApplicationsMulti.next(this.applications.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredApplicationsMulti.next(
            this.applications.filter(app => app.name.toLowerCase().indexOf(search) > -1)
        );
    }

    private filterUsersMulti() {
        if (!this.users) {
            return;
        }
        // get the search keyword
        let search = this.userMultiFilterCtrl?.value?.trim();
        if (!search) {
            this.filteredUsersMulti.next(this.users.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        const filtered = this.users.filter(user => {
            return (
                user.name.toLocaleLowerCase().indexOf(search) > -1 ||
                user?.email?.toLocaleLowerCase()?.indexOf(search) > -1
            );
        });
        // filter the banks
        this.filteredUsersMulti.next(filtered);
    }

    getTextForUser(user: UserResponse): string {
        return `${user.name}` + (user.email ? ` (${user.email})` : ``);
    }

    private setBackButton() {
        this.backButton.routerLink = ["admin", "permissions"];
    }

    private getOrganizations() {
        this.organisationSubscription = this.organisationService.getMultiple(1000, 0, "name", "asc").subscribe(
            orgs => {
                this.organisations = orgs.data;
            },
            (error: HttpErrorResponse) => {
                this.showError(error);
            }
        );
    }

    private getUsers() {
        this.userSubscription = this.userService.getMultiple(1000, 0, "name", "asc").subscribe(
            users => {
                this.users = users.data;
                this.filteredUsersMulti.next(this.users.slice());
            },
            (error: HttpErrorResponse) => {
                this.showError(error);
            }
        );
    }

    public compare(o1: any, o2: any): boolean {
        return o1 === o2;
    }

    public compareLevels(p1: PermissionTypes, p2: PermissionTypes): boolean {
        return p1?.type === p2?.type;
    }

    organizationChanged() {
        this.getApplications(this.permission.organizationId);
    }

    private getApplications(organizationId: number) {
        this.applicationSubscription = this.applicationService
            .getApplicationsByOrganizationId(organizationId)
            .subscribe(
                res => {
                    this.applications = res.data.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
                    this.filteredApplicationsMulti.next(this.applications.slice());
                },
                (error: HttpErrorResponse) => {
                    this.showError(error);
                }
            );
    }

    private getPermission(id: number) {
        this.subscription = this.permissionService.getPermission(id).subscribe(
            response => {
                this.permission.name = response.name;
                this.permission.levels = response.type;
                this.permissionLevelsCtrl.setValue(this.permission.levels);
                this.permission.userIds = response.users.map(x => x.id);
                this.userMultiCtrl.setValue(this.permission.userIds);
                this.permission.automaticallyAddNewApplications = response.automaticallyAddNewApplications;
                this.isNotGlobalAdmin = this.meService.hasNotTargetPermissions(response, PermissionType.GlobalAdmin);

                if (this.isNotGlobalAdmin) {
                    this.permission.organizationId = response?.organization?.id;
                    this.buildAllowedLevels();
                } else {
                    this.allowedLevels = [{ type: PermissionType.GlobalAdmin }];
                }

                if (
                    this.meService.hasPermissions(
                        response,
                        PermissionType.Read,
                        PermissionType.OrganizationApplicationAdmin
                    )
                ) {
                    this.getApplications(this.permission.organizationId);
                    this.permission.applicationIds = response.applications.map(x => x.id);
                    this.applicationMultiCtrl.setValue(this.permission.applicationIds);
                }
            },
            (error: HttpErrorResponse) => {
                this.showError(error);
            }
        );
    }

    private create(): void {
        this.permissionService.createPermission(this.permission).subscribe(
            _response => {
                this.routeBack();
            },
            (error: HttpErrorResponse) => {
                this.showError(error);
            }
        );
    }

    private update(): void {
        this.permissionService.updatePermission(this.permission, this.id).subscribe(
            () => {
                this.routeBack();
            },
            error => {
                this.showError(error);
            }
        );
    }

    private buildAllowedLevels(): void {
        this.allowedLevels = [
            { type: PermissionType.OrganizationUserAdmin },
            { type: PermissionType.OrganizationApplicationAdmin },
            { type: PermissionType.OrganizationGatewayAdmin },
            { type: PermissionType.Read },
        ];
    }

    isOrganizationApplicationPermission() {
        return this.isReadOrWrite();
    }

    isReadOrWrite(): boolean {
        return this.meService.hasPermissionTypes(
            this.permission.levels,
            PermissionType.Read,
            PermissionType.OrganizationApplicationAdmin
        );
    }

    onSubmit(): void {
        if (this.id) {
            this.update();
        } else {
            this.create();
        }
    }

    private showError(err: HttpErrorResponse) {
        const result = this.errormEssageService.handleErrorMessageWithFields(err);
        this.errorFields = result.errorFields;
        this.errorMessages = result.errorMessages;
    }

    routeBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
