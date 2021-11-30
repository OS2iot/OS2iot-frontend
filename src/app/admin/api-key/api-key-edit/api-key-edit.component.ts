import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { ApiKeyRequest } from '../api-key.model';
import { ApiKeyService } from '../api-key.service';

@Component({
  selector: 'app-api-key-edit',
  templateUrl: './api-key-edit.component.html',
  styleUrls: ['./api-key-edit.component.scss'],
})
export class ApiKeyEditComponent implements OnInit {
  apiKeyRequest = new ApiKeyRequest();
  public backButton: BackButton = {
    label: '',
    routerLink: ['admin', 'api-key'],
  };
  public title = '';
  public submitButton = '';
  private apiKeyId: number;
  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public isEditMode = false;
  public permissions: PermissionResponse[] = [];

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location,
    private apiKeyService: ApiKeyService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate
      .get(['NAV.API-KEY', 'FORM.EDIT-API-KEY', 'API-KEY.EDIT.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.API-KEY'];
        this.title = translations['FORM.EDIT-API-KEY'];
        this.submitButton = translations['API-KEY.EDIT.SAVE'];
      });

    this.apiKeyId = +this.route.snapshot.paramMap.get('api-key-id');

    if (this.apiKeyId > 0) {
      // TODO: Fetch current api key
      this.isEditMode = true;
    }
  }

  onSubmit(): void {
    if (this.apiKeyId) {
      this.update();
    } else {
      this.create();
    }
  }

  private create(): void {
    // TODO: CREATE
  }

  private update(): void {
    // TODO: UPDATE
    this.routeBack();
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  routeBack(): void {
    this.location.back();
  }
}
