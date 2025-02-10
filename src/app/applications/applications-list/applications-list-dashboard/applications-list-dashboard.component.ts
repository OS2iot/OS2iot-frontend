import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ApplicationService } from "@applications/application.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { BasicInformationBoxComponent } from "../../../shared/components/basic-information-box/basic-information-box.component";

@Component({
  selector: "app-applications-list-dashboard",
  standalone: true,
  imports: [BasicInformationBoxComponent, TranslateModule],
  templateUrl: "./applications-list-dashboard.component.html",
  styleUrl: "./applications-list-dashboard.component.scss",
})
export class ApplicationsListDashboardComponent implements OnInit {
  gateways: number = 0;

  constructor(
    private gatewayService: ChirpstackGatewayService,
    private applicationService: ApplicationService,
    private translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
    this.gatewayService.getMultiple().subscribe(data => (this.gateways = data.totalCount));

    //TODO:: Number of devices
    //TODO:: status stable of .....
    //TODO:: status error of .....
  }
}
