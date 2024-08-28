import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { TranslateService } from "@ngx-translate/core";
import moment from "moment";
import { Subscription } from "rxjs";
import { MeService } from "@shared/services/me.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { environment } from "@environments/environment";
import { Title } from "@angular/platform-browser";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { GatewayService } from "@app/gateway/gateway.service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-gateway-list",
  templateUrl: "./gateway-overview.component.html",
  styleUrls: ["./gateway-overview.component.scss"],
})
export class GatewayOverviewComponent implements OnInit, OnChanges, OnDestroy {
  public navTabs: any[] = [
    {
      label: "GATEWAY.TABEL-TAB",
      link: "./list",
      index: 0,
    },
    {
      label: "GATEWAY.MAP-TAB",
      link: "./map",
      index: 1,
    },
    {
      label: "LORA-GATEWAY-TABLE.STATUS",
      link: "./status",
      index: 2,
    },
  ];
  public pageLimit = environment.tablePageSize;
  private gatewaySubscription: Subscription;

  organisations: Organisation[];

  private deleteDialogSubscription: Subscription;
  private routerSubscription: Subscription;
  canEdit: boolean;

  constructor(
    public translate: TranslateService,
    private meService: MeService,
    private titleService: Title,
    private sharedVariableService: SharedVariableService,
    public gatewayService: GatewayService,
    private router: Router
  ) {
    translate.use("da");
    moment.locale("da");
  }

  ngOnInit(): void {
    this.organisations = this.sharedVariableService.getOrganizationInfo();
    this.organisations.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
    this.translate.get(["TITLE.LORAWAN-GATEWAY"]).subscribe(translations => {
      this.titleService.setTitle(translations["TITLE.LORAWAN-GATEWAY"]);
    });
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.GatewayWrite);
    if (this.router.url === "/gateways") {
      this.router.navigateByUrl("/gateways/list", { replaceUrl: true });
    }
    // Subscribe to route change to root and route to list view
    this.routerSubscription = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.url === "/gateways") {
        this.router.navigateByUrl("/gateways/list", { replaceUrl: true });
      }
    });
  }

  ngOnChanges() {}

  setOrgIdFilter(orgId: number) {
    this.gatewayService.selectedOrg = orgId;
    this.gatewayService.organisationChangeSubject.next(orgId);
    this.gatewayService.isGatewayStatusVisibleSubject.next();
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.gatewaySubscription?.unsubscribe();
    this.deleteDialogSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }
}
