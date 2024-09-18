import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserRequest } from "../user.model";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../user.service";
import { Subject, Subscription } from "rxjs";
import { Location } from "@angular/common";
import { PermissionResponse, PermissionType } from "@app/admin/permission/permission.model";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { PermissionService } from "@app/admin/permission/permission.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit, OnDestroy {
  public user = new UserRequest();
  public permissions: PermissionResponse[];
  public permissionsSubscription: Subscription;
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: UntypedFormGroup;
  public backButtonTitle = "";
  public title = "";
  public submitButton = "";
  public id: number;
  public subscription: Subscription;
  public isGlobalAdmin = false;
  public isKombit: boolean;
  public canEdit: boolean;
  public permissionMultiCtrl: UntypedFormControl = new UntypedFormControl();
  private _onDestroy = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private meService: MeService,
    private permissionService: PermissionService,
    private sharedVariableService: SharedVariableService
  ) {}

  ngOnInit(): void {
    this.translate.use("da");
    this.translate.get(["NAV.USERS", "FORM.EDIT-USERS", "USERS.SAVE"]).subscribe(translations => {
      this.backButtonTitle = translations["NAV.USERS"];
      this.title = translations["FORM.EDIT-USERS"];
      this.submitButton = translations["USERS.SAVE"];
    });
    this.id = +this.route.snapshot.paramMap.get("user-id");
    if (this.id > 0) {
      this.getUser(this.id);
    } else {
      // Default active to be true if we're creating a new user.
      this.user.active = true;
    }
    this.amIGlobalAdmin();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
    this.getPermissions(this.sharedVariableService.getUserInfo().user.id);
  }

  private getUser(id: number) {
    this.subscription = this.userService.getOne(id).subscribe(response => {
      this.user.name = response.name;
      this.user.email = response.email;
      this.user.id = response.id;
      this.user.active = response.active;
      this.user.globalAdmin = response.permissions.some(perm => perm.name === PermissionType.GlobalAdmin);
      this.isKombit = response.nameId != null;
      this.user.permissionIds = response.permissions.map(pm => pm.id);

      // We cannot set the password.
    });
  }

  amIGlobalAdmin() {
    this.isGlobalAdmin = this.meService.hasGlobalAdmin();
  }

  private create(): void {
    this.userService.post(this.user).subscribe(
      () => {
        this.routeBack();
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
      }
    );
  }

  private update(): void {
    this.userService.put(this.user, this.id).subscribe(
      response => {
        this.routeBack();
      },
      error => {
        this.showError(error);
      }
    );
  }

  onSubmit(): void {
    if (this.user.id) {
      this.update();
    } else {
      this.create();
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];

    if (typeof error.error?.message === "string") {
      this.errorMessage = error.error.message;
      if (error.error.message === "MESSAGE.PASSWORD-DOES-NOT-MEET-REQUIREMENTS") {
        this.errorFields.push("password");
      }
    } else if (error.error?.message?.length > 0) {
      error.error.message.forEach(err => {
        this.errorFields.push(err.property);
        this.errorMessages = this.errorMessages.concat(Object.values(err.constraints));
      });
    } else {
      this.errorMessage = error.message;
    }
    this.formFailedSubmit = true;
  }

  routeBack(): void {
    this.location.back();
  }

  public compare(matOptionValue: number, ngModelObject: number): boolean {
    return matOptionValue === ngModelObject;
  }

  private getPermissions(userId: number) {
    this.permissionsSubscription = this.permissionService
      .getPermissionsWithoutUsers(
        1000,
        0,
        undefined,
        undefined,
        this.meService.hasGlobalAdmin() ? undefined : userId,
        undefined,
        true
      )
      .subscribe(res => {
        this.permissions = res.data.sort((a, b) => a.name.localeCompare(b.name, "da-DK", { numeric: true }));
        if (!this.id) {
          this.permissionMultiCtrl.setValue(this.user.permissionIds);
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.permissionsSubscription) {
      this.permissionsSubscription.unsubscribe();
    }
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
