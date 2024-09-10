import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { PermissionResponse } from "@app/admin/permission/permission.model";
import { PermissionService } from "@app/admin/permission/permission.service";
import { Application, UpdateApplicationOrganization } from "@applications/application.model";
import { TranslateService } from "@ngx-translate/core";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
import { MeService } from "@shared/services/me.service";
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
  public organizationsSubscription: Subscription;
  public permissionMultiCtrl: UntypedFormControl = new UntypedFormControl();
  public permissionMultiFilterCtrl: UntypedFormControl = new UntypedFormControl();
  public application: UpdateApplicationOrganization;
  public permissions: PermissionResponse[];
  public organizations: Organisation[];
  public filteredPermissionsMulti: ReplaySubject<PermissionResponse[]> = new ReplaySubject<PermissionResponse[]>(1);
  public filteredOrganizationsMulti: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);

  constructor(
    private restService: RestService,
    public translate: TranslateService,
    private permissionService: PermissionService,
    private organizationService: OrganisationService,
    private sharedVariableService: SharedVariableService,
    private meService: MeService,
    @Inject(MAT_DIALOG_DATA) public dialogModel: ApplicationDialogModel
  ) {
    this.application = {
      applicationId: this.dialogModel.id,
      organizationId: this.dialogModel.organizationId ?? this.sharedVariableService.getSelectedOrganisationId(),
      permissionIds: [],
    };
    this.permissionMultiCtrl.setValue(this.application.permissionIds);
  }

  ngOnInit(): void {
    this.translate.use("da");
    if (this.dialogModel.id) {
      this.getApplication(this.dialogModel.id);
    }
    this.getOrganizations();
    this.getPermissions();
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  getApplication(id: number): void {
    this.applicationsSubscription = this.restService
      .get("application", {}, id)
      .subscribe((application: Application) => {
        this.application.permissionIds = application.permissionIds;
        this.permissionMultiCtrl.setValue(this.application.permissionIds);
      });
  }

  getOrganizations() {
    this.organizationsSubscription = this.organizationService.getMinimal().subscribe(res => {
      this.organizations = res.data;
      this.filteredOrganizationsMulti.next(this.organizations.slice());
    });
  }

  getPermissions() {
    this.permissionsSubscription = this.permissionService
      .getPermissions(
        1000,
        0,
        undefined,
        undefined,
        this.meService.hasGlobalAdmin() ? undefined : this.sharedVariableService.getUserInfo().user.id
      )
      .subscribe(res => {
        this.permissions = res.data.sort((a, b) => a.name.localeCompare(b.name, "da-DK", { numeric: true }));
        this.filteredPermissionsMulti.next(
          this.permissions.filter(p => p?.organization?.id === this?.application?.organizationId)
        );
        if (!this.dialogModel.id) {
          this.application.permissionIds = [this.permissions[0].id];
          this.permissionMultiCtrl.setValue(this.application.permissionIds);
        }
      });
  }

  onOrganizationChange() {
    this.filteredPermissionsMulti.next(
      this.permissions.filter(p => p?.organization?.id === this?.application?.organizationId)
    );
    this.filteredPermissionsMulti.subscribe(res => {
      this.permissionMultiCtrl.setValue(
        res.filter(permission => permission.automaticallyAddNewApplications).map(permission => permission.id)
      );
    });
  }
}
