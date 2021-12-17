import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserRequest } from '../user.model';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { PermissionType } from '@app/admin/permission/permission.model';
import { AuthService, CurrentUserInfoResponse } from '@auth/auth.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { MeService } from '@shared/services/me.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  user = new UserRequest();
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButtonTitle = '';
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;
  isGlobalAdmin = false;
  isKombit: boolean;
  canEdit: boolean;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private authService: AuthService,
    private sharedVariableService: SharedVariableService,
    private meService: MeService
  ) {}

  ngOnInit(): void {
    this.translate.use('da');
    this.translate
      .get(['NAV.USERS', 'FORM.EDIT-USERS', 'USERS.SAVE'])
      .subscribe((translations) => {
        this.backButtonTitle = translations['NAV.USERS'];
        this.title = translations['FORM.EDIT-USERS'];
        this.submitButton = translations['USERS.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('user-id');
    if (this.id > 0) {
      this.getUser(this.id);
    } else {
      // Default active to be true if we're creating a new user.
      this.user.active = true;
    }
    this.amIGlobalAdmin();
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite);
  }

  private getUser(id: number) {
    this.subscription = this.userService.getOne(id).subscribe((response) => {
      this.user.name = response.name;
      this.user.email = response.email;
      this.user.id = response.id;
      this.user.active = response.active;
      this.user.globalAdmin = response.permissions.some(
        (x) => x.type === PermissionType.GlobalAdmin
      );
      this.isKombit = response.nameId != null;
      // We cannot set the password.
    });
  }

  amIGlobalAdmin() {
    this.isGlobalAdmin = this.sharedVariableService.isGlobalAdmin();
  }

  private create(): void {
    this.userService.post(this.user).subscribe(
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
    this.userService.put(this.user, this.id).subscribe(
      (response) => {
        this.routeBack();
      },
      (error) => {
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

    if (typeof error.error?.message === 'string') {
      this.errorMessage = error.error.message;
      if (
        error.error.message === 'MESSAGE.PASSWORD-DOES-NOT-MEET-REQUIREMENTS'
      ) {
        this.errorFields.push('password');
      }
    } else if (error.error?.message?.length > 0) {
      error.error.message.forEach((err) => {
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
