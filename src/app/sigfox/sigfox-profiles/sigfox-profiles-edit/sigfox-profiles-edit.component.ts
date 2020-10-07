import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';
import { SigfoxService } from '@shared/services/sigfox.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sigfox-profiles-edit',
  templateUrl: './sigfox-profiles-edit.component.html',
  styleUrls: ['./sigfox-profiles-edit.component.scss']
})
export class SigfoxProfilesEditComponent implements OnInit {
  sigfoxDevice = new SigfoxDeviceType();
  sigfoxDevices: SigfoxDeviceType[];
  public errorMessage: string;
  public errorFields: string[];
  public formFailedSubmit = false;
  public form: FormGroup;
  public backButton: BackButton = { label: '', routerLink: '/sigfox' };
  public title = '';
  public submitButton = '';
  id: string;
  subscription: Subscription;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private sigfoxService: SigfoxService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate
      .get(['NAV.ORGANISATIONS', 'FORM.EDIT-ORGANISATION', 'ORGANISATION.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.ORGANISATIONS'];
        this.title = translations['FORM.EDIT-ORGANISATION'];
        this.submitButton = translations['ORGANISATION.SAVE'];
      });
    this.id = this.route.snapshot.paramMap.get('org-id');
    if (!this.id === null) {
      this.getsigfoxDevice(this.id);
    }
  }

  private getsigfoxDevice(id: string) {
    this.subscription = this.sigfoxService
      .getDeviceType(id)
      .subscribe((response) => {
        this.sigfoxDevice = response;
      });
  }

  private create(): void {
    this.sigfoxService.postDeviceType(this.sigfoxDevice).subscribe(
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
    this.sigfoxService.putDeviceType(this.sigfoxDevice).subscribe(
      (response) => {
        this.routeBack();
      },
      (error) => {
        this.showError(error);
      }
    );
  }

  onSubmit(): void {
    if (this.sigfoxDevice) {
      this.update();
    } else {
      this.create();
    }
  }

  private showError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessage = '';

    this.errorMessage = error.error.message;
    this.errorFields.push('name');
    this.formFailedSubmit = true;
  }

  routeBack(): void {
    this.location.back();
  }
}
