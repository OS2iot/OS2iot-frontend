import { AfterViewInit, Component } from "@angular/core";
import { GatewayService } from "@app/gateway/gateway.service";

@Component({
  selector: "app-gateway-status-overview",
  templateUrl: "./gateway-status-overview.component.html",
  styleUrls: ["./gateway-status-overview.component.scss"],
  standalone: false,
})
export class GatewayStatusOverviewComponent implements AfterViewInit {
  constructor(public gatewayService: GatewayService) {}

  ngAfterViewInit(): void {
    this.gatewayService.organisationChangeSubject.next(this.gatewayService.selectedOrg);
    this.gatewayService.isGatewayStatusVisibleSubject.next();
  }
}
