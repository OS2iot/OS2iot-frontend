import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PermissionResponse } from "@app/admin/permission/permission.model";
import { PermissionService } from "@app/admin/permission/permission.service";
import { Application, ApplicationRequest } from "@applications/application.model";
import { TranslateService } from "@ngx-translate/core";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
import { RestService } from "@shared/services/rest.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subscription } from "rxjs";

@Component({
  selector: "app-change-organization-dialog",
  templateUrl: "./change-organization-dialog.component.html",
  styleUrls: ["./change-organization-dialog.component.scss"],
})
export class ChangeOrganizationDialogComponent implements OnInit {
  public applicationsSubscription: Subscription;
  public permissionsSubscription: Subscription;
  public permissionMultiCtrl: UntypedFormControl = new UntypedFormControl();
  public permissionMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();
  application = new ApplicationRequest();
  public permissions: PermissionResponse[];
  public filteredPermissionsMulti: ReplaySubject<PermissionResponse[]> = new ReplaySubject<PermissionResponse[]>(1);

  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private permissionService: PermissionService,
    private sharedVariableService: SharedVariableService,
    @Inject(MAT_DIALOG_DATA) public dialogModel: ApplicationDialogModel
  ) {
    this.permissionMultiCtrl.setValue(this.application.permissionIds);
  }

  ngOnInit(): void {
    this.translate.use("da");
    if (this.dialogModel.id) {
      this.getApplication(this.dialogModel.id);
    }
    this.getPermissions(this.sharedVariableService.getUserInfo().user.id);
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  getApplication(id: number): void {
    this.applicationsSubscription = this.restService
      .get("application", {}, id)
      .subscribe((application: Application) => {
        this.application = new ApplicationRequest();
        this.application.name = application.name;
        this.application.description = application.description;
        this.application.organizationId = application.belongsTo.id;
        this.application.status = application.status;
        this.application.startDate = application.startDate;
        this.application.endDate = application.endDate;

        this.application.category = application.category;
        this.application.owner = application.owner;
        this.application.contactPerson = application.contactPerson;
        this.application.contactEmail = application.contactEmail;
        this.application.contactPhone = application.contactPhone;
        this.application.personalData = application.personalData;
        this.application.hardware = application.hardware;
        this.application.controlledProperties = application.controlledProperties.map(ctrlProperty => ctrlProperty.type);
        this.application.deviceTypes = application.deviceTypes.map(deviceType => deviceType.type);
        this.application.permissionIds = application.permissionIds;
        this.permissionMultiCtrl.setValue(this.application.permissionIds);
      });
  }

  getPermissions(userId: number) {
    this.permissionsSubscription = this.permissionService
      .getPermissions(1000, 0, undefined, undefined, userId, this.sharedVariableService.getSelectedOrganisationId())
      .subscribe(res => {
        this.permissions = res.data.sort((a, b) => a.name.localeCompare(b.name, "da-DK", { numeric: true }));
        this.filteredPermissionsMulti.next(this.permissions.slice());
        if (!this.dialogModel.id) {
          this.application.permissionIds = [this.permissions[0].id];
          this.permissionMultiCtrl.setValue(this.application.permissionIds);
        }
      });
  }
}
