import { AfterViewInit, Component } from "@angular/core";
import { GatewayService } from "@app/gateway/gateway.service";

@Component({
  selector: "app-gateway-list",
  templateUrl: "./gateway-list.component.html",
  styleUrls: ["./gateway-list.component.scss"],
  standalone: false,
})
export class GatewayListComponent implements AfterViewInit {
  constructor(public gatewayService: GatewayService) {}

  ngAfterViewInit(): void {
    this.gatewayService.organisationChangeSubject.next(this.gatewayService.selectedOrg);
  }
}
