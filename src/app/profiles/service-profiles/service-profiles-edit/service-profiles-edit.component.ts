import { Component, OnInit } from '@angular/core';
import { BackButton } from '@app/models/back-button';
import { FormGroup, FormControl, Validators, AbstractFormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from 'guid-typescript';
import { ServiceProfile } from '../service-profile.model';

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
  serviceProfile: ServiceProfile;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {
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
  }

  get f() {
    return this.serviceProfileForm.controls;
  }

}
