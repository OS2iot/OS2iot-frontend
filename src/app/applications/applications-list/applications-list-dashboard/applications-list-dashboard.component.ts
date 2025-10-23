import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ApplicationService } from "@applications/application.service";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { BasicInformationBoxComponent } from "../../../shared/components/basic-information-box/basic-information-box.component";

@Component({
  selector: "app-applications-list-dashboard",
  imports: [BasicInformationBoxComponent, TranslatePipe],
  templateUrl: "./applications-list-dashboard.component.html",
  styleUrl: "./applications-list-dashboard.component.scss",
})
export class ApplicationsListDashboardComponent implements OnInit {
  total: number = 0;
  withError: number = 0;
  withoutError: number = 0;
  totalDevices: number = 0;
  totalGateways: number;

  constructor(
    private gatewayService: ChirpstackGatewayService,
    private applicationService: ApplicationService,
    private translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sharedVariableService: SharedVariableService
  ) {
    this.matIconRegistry.addSvgIcon(
      "micro-chip",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/microchip.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "satellite-dish",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/satellite-dish.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "check-circle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/check-circle.svg"),
      {}
    );

    this.matIconRegistry.addSvgIcon(
      "exclamation-triangle",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/exclamation-triangle.svg"),
      {}
    );
  }
  ngOnInit(): void {
    this.applicationService
      .getApplicationsWithError(this.sharedVariableService.getSelectedOrganisationId())
      .subscribe(data => {
        this.withError = data.withError;
        this.totalDevices = data.totalDevices;
        this.withoutError = data.total - data.withError;
        this.total = data.total;
      });

    this.gatewayService
      .getMultiple()
      .subscribe(
        data =>
          (this.totalGateways = data.resultList.filter(
            gw => gw.organizationId === this.sharedVariableService.getSelectedOrganisationId()
          ).length)
      );
  }
}
