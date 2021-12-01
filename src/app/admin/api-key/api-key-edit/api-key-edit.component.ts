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
  private id: number;
  public errorMessage: string;
  public errorMessages: string[];
  public errorFields: string[];
  public formFailedSubmit = false;
  public isEditMode = false;
  public permissions: PermissionResponse[] = [];
  private organizationId: number;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location,
    private apiKeyService: ApiKeyService,
    private permissionService: PermissionService,
    private errorMessageService: ErrorMessageService,
    private sharedVariableService: SharedVariableService
  ) {
    translate.use('da');
  }

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
    this.organizationId = this.sharedVariableService.getSelectedOrganisationId();

    // if (this.id > 0) {
    //   // TODO: Fetch current api key
    //   this.getApiKey(this.id);
    //   this.isEditMode = true;
    // }
  }

  // private getApiKey(id: number) {
  //   this.apiKeyService.get(id).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.apiKeyRequest.id = response.id;
  //       this.apiKeyRequest.name = response.name;
  //       this.apiKeyRequest.permissions = response.permissions;
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.showError(error);
  //     }
  //   );
  // }

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
        (permissions) => {
          this.permissions = permissions.data.filter(
            (x) => x.organization?.id === this.organizationId
          );
        },
        (error: HttpErrorResponse) => {
          this.showError(error);
        }
      );
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
    this.apiKeyService
      .update(this.apiKeyRequest, this.id)
      .subscribe(this.routeBack, this.showError);
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  private showError(err: HttpErrorResponse) {
    const result = this.errorMessageService.handleErrorMessageWithFields(err);
    this.errorFields = result.errorFields;
    this.errorMessages = result.errorMessages;
  }

  routeBack(): void {
    this.location.back();
  }
}
