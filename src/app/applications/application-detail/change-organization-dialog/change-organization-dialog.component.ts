import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { PermissionResponse } from "@app/admin/permission/permission.model";
import { PermissionService } from "@app/admin/permission/permission.service";
import { Application, UpdateApplicationOrganization } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { TranslateService } from "@ngx-translate/core";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
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
  public application: UpdateApplicationOrganization;
  public permissions: PermissionResponse[];
  public organizations: Organisation[];
  public filteredPermissionsMulti: ReplaySubject<PermissionResponse[]> = new ReplaySubject<PermissionResponse[]>(1);
  public filteredOrganizations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);

  constructor(
    private applicationService: ApplicationService,
    public translate: TranslateService,
    private permissionService: PermissionService,
    private organizationService: OrganisationService,
    private sharedVariableService: SharedVariableService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<ChangeOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: ApplicationDialogModel
  ) {
    this.application = {
      organizationId: this.dialogModel.organizationId ?? this.sharedVariableService.getSelectedOrganisationId(),
      permissionIds: [],
    };
  }

  ngOnInit(): void {
    this.translate.use("da");
    if (this.dialogModel.id) {
      this.getApplication(this.dialogModel.id);
    }
    this.getOrganizations();
    this.getPermissions();
  }

  getApplication(id: number): void {
    this.applicationsSubscription = this.applicationService.getApplication(id).subscribe((application: Application) => {
      this.application.permissionIds = application.permissionIds;
    });
  }

  getOrganizations() {
    this.organizationsSubscription = this.organizationService.getMinimal().subscribe(res => {
      this.organizations = res.data;
      this.filteredOrganizations.next(this.organizations.slice());
    });
  }

  getPermissions() {
    this.permissionsSubscription = this.permissionService.getPermissions(1000, 0).subscribe(res => {
      this.permissions = res.data.sort((a, b) => a.name.localeCompare(b.name, "da-DK", { numeric: true }));
      this.filteredPermissionsMulti.next(
        this.permissions.filter(p => p?.organization?.id === this?.application?.organizationId)
      );
    });
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onOrganizationChange() {
    this.filteredPermissionsMulti.next(
      this.permissions.filter(p => p?.organization?.id === this?.application?.organizationId)
    );
    this.filteredPermissionsMulti.subscribe(res => {
      this.application.permissionIds = res
        .filter(permission => permission.automaticallyAddNewApplications)
        .map(permission => permission.id);
    });
  }

  onSubmit() {
    this.applicationsSubscription = this.applicationService
      .updateApplicationOrganization(this.application, this.dialogModel.id)
      .subscribe(savedApplication => {
        this.snackBar.open(
          this.translate.instant("APPLICATION.CHANGE-ORGANIZATION.SNACKBAR-SAVED", {
            applicationName: savedApplication.name,
            organizationName: savedApplication.belongsTo.name,
          }),
          "",
          {
            duration: 10000,
          }
        );
        this.dialog.close(true);
      });
  }
}
