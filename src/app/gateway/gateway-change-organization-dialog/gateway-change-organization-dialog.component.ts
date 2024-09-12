import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { TranslateService } from "@ngx-translate/core";
import { GatewayDialogModel } from "@shared/models/dialog.model";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subscription } from "rxjs";
import { UpdateGatewayOrganization } from "../gateway.model";

@Component({
  selector: "app-gateway-change-organization-dialog",
  templateUrl: "./gateway-change-organization-dialog.component.html",
  styleUrls: ["./gateway-change-organization-dialog.component.scss"],
})
export class GatewayChangeOrganizationDialogComponent implements OnInit {
  public gatewaysSubscription: Subscription;
  public organizationsSubscription: Subscription;
  public gateway: UpdateGatewayOrganization;
  public organizations: Organisation[];
  public filteredOrganizations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);

  constructor(
    private gatewayService: ChirpstackGatewayService,
    public translate: TranslateService,
    private organizationService: OrganisationService,
    private sharedVariableService: SharedVariableService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<GatewayChangeOrganizationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: GatewayDialogModel
  ) {
    this.gateway = {
      organizationId: this.dialogModel.organizationId ?? this.sharedVariableService.getSelectedOrganisationId(),
    };
  }

  ngOnInit(): void {
    this.translate.use("da");
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizationsSubscription = this.organizationService.getMultiple().subscribe(res => {
      this.organizations = res.data;
      this.filteredOrganizations.next(this.organizations.slice());
    });
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onSubmit() {
    this.gatewaysSubscription = this.gatewayService
      .updateGatewayOrganization(this.gateway, this.dialogModel.gatewayDbId)
      .subscribe(gateway => {
        this.snackBar.open(
          this.translate.instant("GATEWAY.CHANGE-ORGANIZATION.SNACKBAR-SAVED", {
            gatewayName: gateway.name,
            organizationName: gateway.organization.name,
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
