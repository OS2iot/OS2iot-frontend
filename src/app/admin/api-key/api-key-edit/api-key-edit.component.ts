import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { PermissionService } from '@app/admin/permission/permission.service';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from '@shared/error-message.service';
import { BackButton } from '@shared/models/back-button.model';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
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
  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public permissions: PermissionResponse[] = [];
  private organizationId: number;
  private id: number;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location,
    private apiKeyService: ApiKeyService,
    private permissionService: PermissionService,
    private errorMessageService: ErrorMessageService,
    private sharedVariableService: SharedVariableService
  ) {}

  ngOnInit(): void {
    this.getPermissions();
    this.translate.use('da');
    this.translate
      .get(['NAV.API-KEY', 'FORM.EDIT-API-KEY', 'API-KEY.EDIT.SAVE'])
      .subscribe((translations) => {
        this.backButton.label = translations['NAV.API-KEY'];
        this.title = translations['FORM.EDIT-API-KEY'];
        this.submitButton = translations['API-KEY.EDIT.SAVE'];
      });

    this.id = +this.route.snapshot.paramMap.get('api-key-id');

    if (this.id > 0) {
      this.getApiKey(this.id);
    }
    this.organizationId = this.sharedVariableService.getSelectedOrganisationId();
  }

  private getPermissions() {
    this.permissionService
      .getPermissions(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.organizationId
      )
      .subscribe(
        (permissionsResponse) => {
          this.permissions = permissionsResponse.data.filter(
            (x) => x.organization?.id === this.organizationId
          );
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
  }

  private getApiKey(id: number) {
    this.apiKeyService.get(id).subscribe((key) => {
      this.apiKeyRequest.id = key.id;
      this.apiKeyRequest.name = key.name;
      this.apiKeyRequest.permissionIds = key.permissions.map((pm) => pm.id);
    });
  }

  onSubmit(): void {
    this.id ? this.update() : this.create();
  }

  private create(): void {
    this.apiKeyService.create(this.apiKeyRequest).subscribe(
      () => this.routeBack(),
      (err) => this.showError(err)
    );
  }

  private update(): void {
    this.apiKeyService.update(this.apiKeyRequest, this.id).subscribe(
      () => this.routeBack(),
      (err) => this.showError(err)
    );
  }

  public compare(
    matOptionValue: number,
    ngModelObject: number
  ): boolean {
    return matOptionValue === ngModelObject;
  }

  showError(err: HttpErrorResponse) {
    const result = this.errorMessageService.handleErrorMessageWithFields(err);
    this.errorFields = result.errorFields;
    this.errorMessages = result.errorMessages;
  }

  routeBack(): void {
    this.location.back();
  }
}
