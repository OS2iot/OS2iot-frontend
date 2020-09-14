import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { FormGroup, FormControl, Validators, AbstractFormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { NameValidator } from '@shared/validators/name.validator';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-service-profiles-edit',
  templateUrl: './service-profiles-edit.component.html',
  styleUrls: ['./service-profiles-edit.component.scss']

})
export class ServiceProfilesEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/profiles' };
  public title: 'Service Profile';
  public id: Guid;
  serviceId: number;
  editMode = false;
  serviceProfileForm: FormGroup;

  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
    this.id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.serviceId = +params['serviceId'];
      this.editMode = params['serviceId'] != null;
    });
    this.translate.get(['PROFILES.SERVICE_PROFILE.GOBACK', 'PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE', ])
      .subscribe(translations => {
        this.backButton.label = translations['PROFILES.SERVICE_PROFILE.GOBACK'];
        this.title = translations['PROFILES.SERVICE_PROFILE.ADDSERVICEPROFILE'];

      });
  }

  onSubmit() {
    this.onCancel();
  }



  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  get f() {
    return this.serviceProfileForm.controls;
  }

}
