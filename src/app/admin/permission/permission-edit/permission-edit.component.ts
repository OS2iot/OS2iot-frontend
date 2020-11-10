import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { PermissionService } from '../permission.service';
import { PermissionRequest, PermissionType } from '../permission.model';
import { OrganisationResponse } from '../../organisation/organisation.model';
import { OrganisationService } from '../../organisation/organisation.service';
import { UserService } from '../../users/user.service';
import { UserResponse } from '../../users/user.model';
import { ApplicationService } from '@applications/application.service';
import { Application } from '@applications/application.model';
import { BackButton } from '@shared/models/back-button.model';
import { ErrorMessageService } from '@shared/error-message.service';

@Component({
  selector: 'app-permission-edit',
  templateUrl: './permission-edit.component.html',
  styleUrls: ['./permission-edit.component.scss'],
})
export class PermissionEditComponent implements OnInit {
  permission = new PermissionRequest();
  public organisations: OrganisationResponse[];
  public users: UserResponse[];
  public applications: Application[];
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/permissions' };
  public title = '';
  public submitButton = '';
  public isEditMode = false;
  id: number;
  subscription: Subscription;
  organisationSubscription: Subscription;
  userSubscription: Subscription;
  applicationSubscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private organisationService: OrganisationService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private location: Location,
    private errormEssageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
    this.getUsers();
    this.translate.use('da');
    this.translate
      .get(['NAV.PERMISSIONS', 'FORM.EDIT-PERMISSION', 'PERMISSION.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.PERMISSIONS'];
        this.title = translations['FORM.EDIT-PERMISSION'];
        this.submitButton = translations['PERMISSION.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('permission-id');
    if (this.id > 0) {
      this.getPermission(this.id);
      this.isEditMode = true;
    }
  }

  private getOrganizations() {
    this.organisationSubscription = this.organisationService
      .getMultiple()
      .subscribe(
        (orgs) => {
          this.organisations = orgs.data;
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private getUsers() {
    this.userSubscription = this.userService.getMultiple().subscribe(
      (users) => {
        this.users = users.data;
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
      }
    );
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  organizationChanged() {
    this.getApplications(this.permission.organizationId);
  }

  private getApplications(organizationId: number) {
    this.applicationSubscription = this.applicationService
      .getApplicationsByOrganizationId(organizationId)
      .subscribe(
        (res) => {
          this.applications = res.data;
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private getPermission(id: number) {
    this.subscription = this.permissionService.getPermission(id).subscribe(
      (response) => {
        console.log(response);
        this.permission.name = response.name;
        this.permission.level = response.type;
        this.permission.userIds = response.users.map((x) => x.id);
        this.permission.automaticallyAddNewApplications = response.automaticallyAddNewApplications;

        if (response.type !== PermissionType.GlobalAdmin) {
          this.permission.organizationId = response?.organization?.id;
        }

        if (
          response.type === PermissionType.Read ||
          response.type === PermissionType.Write
        ) {
          this.getApplications(this.permission.organizationId);
          this.permission.applicationIds = response.applications.map(
            (x) => x.id
          );
        }
      },
      (error: HttpErrorResponse) => {
        this.showError(error);
      }
    );
  }

  private create(): void {
    this.permissionService.createPermission(this.permission).subscribe(
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
    this.permissionService.updatePermission(this.permission, this.id).subscribe(
      () => {
        this.routeBack();
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  allowedLevels() {
    if (this.permission.level == PermissionType.GlobalAdmin) {
      return [PermissionType.GlobalAdmin];
    }
    return [
      PermissionType.OrganizationAdmin,
      PermissionType.Write,
      PermissionType.Read,
    ];
  }

  isUserPartOfPermission(userId) {
    if (this?.permission?.userIds) {
      return this.permission.userIds.indexOf(userId) >= 0;
    } else {
      return false;
    }
  }

  isApplicationPartOfPermission(appId) {
    if (this?.permission?.applicationIds) {
      return this.permission.applicationIds.indexOf(appId) >= 0;
    } else {
      return false;
    }
  }

  isOrganizationAdministrationPermission() {
    return (
      this.permission.level ==
        PermissionType.OrganizationApplicationPermissions ||
      this.permission.level == PermissionType.Write ||
      this.permission.level == PermissionType.Read
    );
  }

  isReadOrWrite(): boolean {
    return this.permission.level === PermissionType.Read || this.permission.level === PermissionType.Write
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
}
