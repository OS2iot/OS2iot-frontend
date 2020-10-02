import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SigFoxGroup } from '@app/sigfox/sigfox-group.model';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SigfoxGroupService } from '@app/sigfox/sigfox-group.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sigfox-administration-edit',
  templateUrl: './sigfox-administration-edit.component.html',
  styleUrls: ['./sigfox-administration-edit.component.scss']
})
export class SigfoxAdministrationEditComponent implements OnInit {
  id: string;
  sigfoxGroup = new SigFoxGroup();
  subscription: Subscription;
  isLoading = false;

  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public title = '';
  public backButton: BackButton = { label: '', routerLink: '/administration' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private sigfoxGroupService: SigfoxGroupService,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.translate.get(['PROFILES.NAME', 'FORM.EDIT-DEVICE-PROFILE'])
      .subscribe(translations => {
        this.title = translations['FORM.EDIT-DEVICE-PROFILE'];
        this.backButton.label = translations['PROFILES.NAME'];
      });

    this.id = this.route.snapshot.paramMap.get('sigfox');
    if (this.id) {
      this.getSigfoxGroup(this.id);
    }
  }

  getSigfoxGroup(id: string) {
    this.subscription = this.sigfoxGroupService.getSigfoxGroupOne(id)
      .subscribe(
        (response) => {
          this.sigfoxGroup = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  private create(): void {
    this.sigfoxGroupService.post(this.sigfoxGroup)
      .subscribe(
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
    this.sigfoxGroupService.put(this.sigfoxGroup)
      .subscribe(
        (response) => {
          this.routeBack();
        },
        (error) => {
          this.showError(error);
        });
  }

  routeBack(): void {
    this.location.back();
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessage = '';
    this.errorMessages = [];
    if (error.error?.chirpstackError) {
      this.errorMessage = error.error.chirpstackError.message;
    } else if (error.error?.message?.length > 0) {
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

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    this.sigfoxGroupService.getSigfoxGroupOne(username, password).subscribe(
      (x: any) => {
        if (this.sigfoxGroup.id) {
          this.update();
        } else {
          this.create();
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
