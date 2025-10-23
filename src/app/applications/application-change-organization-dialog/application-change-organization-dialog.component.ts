import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { PermissionsSlimDto } from "@app/admin/permission/permission.model";
import { PermissionService } from "@app/admin/permission/permission.service";
import { Application, UpdateApplicationOrganization } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { TranslateService } from "@ngx-translate/core";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subscription } from "rxjs";

@Component({
  selector: "app-change-organization-dialog",
  templateUrl: "./application-change-organization-dialog.component.html",
  styleUrls: ["./application-change-organization-dialog.component.scss"],
  standalone: false,
})
export class ApplicationChangeOrganizationDialogComponent implements OnInit {
  public applicationsSubscription: Subscription;
  public permissionsSubscription: Subscription;
  public organizationsSubscription: Subscription;
  public application: UpdateApplicationOrganization;
  public permissions: PermissionsSlimDto[];
  public organizations: Organisation[];
  public filteredPermissionsMulti: ReplaySubject<PermissionsSlimDto[]> = new ReplaySubject<PermissionsSlimDto[]>(1);
  public filteredOrganizations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);

  constructor(
    private applicationService: ApplicationService,
    public translate: TranslateService,
    private permissionService: PermissionService,
    private organizationService: OrganisationService,
    private sharedVariableService: SharedVariableService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<ApplicationChangeOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: ApplicationDialogModel
  ) {
    this.application = {
      organizationId: this.dialogModel.organizationId ?? this.sharedVariableService.getSelectedOrganisationId(),
      permissionIds: [],
    };
  }

  ngOnInit(): void {
    this.translate.use("da");
    if (this.dialogModel.applicationId) {
      this.getApplication(this.dialogModel.applicationId);
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
    this.organizationsSubscription = this.organizationService.getMultipleWithApplicationAdmin().subscribe(res => {
      this.organizations = res.data.sort((a, b) => a.name.localeCompare(b.name, "da-DK", { numeric: true }));
      this.filteredOrganizations.next(this.organizations.slice());
    });
  }

  getPermissions() {
    this.permissionsSubscription = this.permissionService
      .getPermissionsWhereApplicationAdmin(1000, 0)
      .subscribe(res => {
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
      .updateApplicationOrganization(this.application, this.dialogModel.applicationId)
      .subscribe(savedApplication => {
        this.snackBar.open(
          this.translate.instant("APPLICATION.CHANGE-ORGANIZATION.SNACKBAR-SAVED", {
            applicationName: savedApplication.name,
            organizationName: savedApplication.belongsTo.name,
          }),
          this.translate.instant("DIALOG.OK"),
          {
            duration: 10000,
          }
        );
        this.dialog.close(true);
        this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => location.reload());
      });
  }
}
