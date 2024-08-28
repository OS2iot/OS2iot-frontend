import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
    PermissionRequestAcceptUser,
    PermissionType,
    PermissionTypes,
    PermissionResponse,
} from "@app/admin/permission/permission.model";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { Subscription } from "rxjs";
import { UserResponse } from "../user.model";
import { UserService } from "../user.service";
import { Location } from "@angular/common";
import { PermissionService } from "@app/admin/permission/permission.service";
import { UntypedFormControl } from "@angular/forms";

@Component({
    selector: "app-accept-user",
    templateUrl: "./accept-user.component.html",
    styleUrls: ["./accept-user.component.scss"],
})
export class AcceptUserComponent implements OnInit, OnDestroy {
    public backButtonTitle: string;
    permission = new PermissionRequestAcceptUser();
    public title: string;
    userId: number;
    subscription: Subscription;
    permissionsForOrgSubscription: Subscription;
    user: UserResponse;
    errorFields: string[];
    organizationId: number;
    organizationName: string;
    public formFailedSubmit = false;
    errorMessages: any;
    allowedLevels: PermissionTypes[] = [
        { type: PermissionType.OrganizationUserAdmin },
        { type: PermissionType.OrganizationApplicationAdmin },
        { type: PermissionType.OrganizationGatewayAdmin },
        { type: PermissionType.Read },
    ];
    public permissionsCtrl: UntypedFormControl = new UntypedFormControl();
    permissions: PermissionResponse[] = [];

    constructor(
        private userService: UserService,
        private location: Location,
        private translate: TranslateService,
        private route: ActivatedRoute,
        private errorMessageService: ErrorMessageService,
        private permissionService: PermissionService
    ) {}

    ngOnInit(): void {
        this.userId = +this.route.snapshot.paramMap.get("user-id");
        this.organizationId = +this.route.snapshot.paramMap.get("org-id");

        if (this.userId) {
            this.getUser(this.userId);
        }

        this.translate.get(["GEN.BACK", "USERS.ACCEPT-USER.ACCEPT"]).subscribe(translations => {
            this.backButtonTitle = translations["GEN.BACK"];
            this.title = translations["USERS.ACCEPT-USER.ACCEPT"];
        });
        this.permission.userId = this.userId;
        this.permission.organizationId = this.organizationId;
        this.getPermissionsForOrg(this.organizationId);
    }

    private getUser(id: number) {
        this.subscription = this.userService.getOne(id, false).subscribe(response => {
            this.user = response;
        });
    }

    private getPermissionsForOrg(orgId: number) {
        this.permissionsForOrgSubscription = this.permissionService
            .getPermissions(undefined, undefined, undefined, undefined, undefined, orgId)
            .subscribe(
                permissionsResponse => {
                    this.permissions = permissionsResponse.data.filter(x => x.organization?.id === this.organizationId);
                    this.permissionsCtrl.setValue(this.permissions);
                    this.organizationName = permissionsResponse.data[0]?.organization?.name;
                },
                (error: HttpErrorResponse) => {
                    this.showError(error);
                }
            );
    }

    private showError(err: HttpErrorResponse) {
        const result = this.errorMessageService.handleErrorMessageWithFields(err);
        this.errorFields = result.errorFields;
        this.errorMessages = result.errorMessages;
    }

    routeBack(): void {
        this.location.back();
    }

    onSubmit(): void {
        this.permissionService.createPermissionAcceptUser(this.permission).subscribe(
            () => {
                this.routeBack();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
                this.showError(error);
            }
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.permissionsForOrgSubscription?.unsubscribe();
    }
}
