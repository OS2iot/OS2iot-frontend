import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackButton } from '@app/models/back-button';
import { UserRequest } from '../user.model';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user = new UserRequest();
  public errorMessage: string;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/users' };
  public title = '';
  public submitButton = '';
  id: number;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate
      .get(['NAV.USERS', 'USERS.FORM.EDIT', 'USERS.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.USERS'];
        this.title = translations['FORM.EDIT-USERS'];
        this.submitButton = translations['USERS.SAVE'];
      });
    this.id = +this.route.snapshot.paramMap.get('orgId');
    if (this.id > 0) {
      this.getUser(this.id);
    }
  }

  private getUser(id: number) {
    this.subscription = this.userService
      .getOne(id)
      .subscribe((response) => {
        this.user = response;
      });
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
