import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription, Subject } from "rxjs";
import { ChirpstackGatewayService } from "src/app/shared/services/chirpstack-gateway.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { BackButton } from "@shared/models/back-button.model";
import { Gateway, GatewayStats, GatewayResponse } from "../gateway.model";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MeService } from "@shared/services/me.service";
import { environment } from "@environments/environment";
import { DropdownButton } from "@shared/models/dropdown-button.model";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { ChartConfiguration } from "chart.js";
import { ColorGraphBlue1 } from "@shared/constants/color-constants";
import { formatDate } from "@angular/common";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { MatDialog } from "@angular/material/dialog";
import { GatewayChangeOrganizationDialogComponent } from "../gateway-change-organization-dialog/gateway-change-organization-dialog.component";
import { GatewayDialogModel } from "@shared/models/dialog.model";

@Component({
  selector: "app-gateway-detail",
  templateUrl: "./gateway-detail.component.html",
  styleUrls: ["./gateway-detail.component.scss"],
})
export class GatewayDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ["rxPacketsReceived", "txPacketsEmitted", "txPacketsReceived"];
  private gatewayStats: GatewayStats[];
  public pageSize = environment.tablePageSize;
  public pageSizeOptions = DefaultPageSizeOptions;
  public dataSource = new MatTableDataSource<GatewayStats>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public resultLength = 0;

  public gatewaySubscription: Subscription;
  public gateway: Gateway;
  public backButton: BackButton = { label: "", routerLink: "/gateways/list" };
  gatewayId: string;

  private deleteDialogSubscription: Subscription;
  public dropdownButton: DropdownButton;
  isLoadingResults = true;
  canEdit: boolean;
  isGatewayStatusVisibleSubject = new Subject<void>();
  receivedGraphData: ChartConfiguration["data"] = { datasets: [] };
  sentGraphData: ChartConfiguration["data"] = { datasets: [] };

  constructor(
    private gatewayService: ChirpstackGatewayService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private meService: MeService,
    private deleteDialogService: DeleteDialogService,
    private changeOrganizationDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.translate.use("da");
    this.gatewayId = this.route.snapshot.paramMap.get("id");
    this.translate.get(["NAV.LORA-GATEWAYS"]).subscribe(translations => {
      this.backButton.label = translations["NAV.LORA-GATEWAYS"];
    });

    if (this.gateway) {
      this.canEdit = this.meService.hasAccessToTargetOrganization(
        OrganizationAccessScope.GatewayWrite,
        this.gateway.organizationId
      );
    }
  }

  ngAfterViewInit() {
    if (this.gatewayId) {
      this.bindGateway(this.gatewayId);
    }
  }

  getCoordinates() {
    return {
      longitude: this.gateway.location.longitude,
      latitude: this.gateway.location.latitude,
      draggable: false,
      editEnabled: false,
      useGeolocation: false,
      markerInfo: {
        name: this.gateway.name,
        active: this.gatewayService.isGatewayActive(this.gateway),
        gatewayId: this.gateway.gatewayId,
        id: this.gateway.gatewayId,
        internalOrganizationName: this.gateway.organizationName,
      },
    };
  }

  bindGateway(gatewayId: string): void {
    this.gatewayService.get(gatewayId).subscribe((result: GatewayResponse) => {
      // Mapping tuples to JSON
      result.gateway.tagsString = JSON.stringify(result.gateway.tags);
      this.gateway = result.gateway;
      this.canEdit = this.meService.hasAccessToTargetOrganization(
        OrganizationAccessScope.GatewayWrite,
        this.gateway.organizationId
      );
      this.gateway.canEdit = this.canEdit;
      this.gatewayStats = result.stats;
      this.gatewayStats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      this.dataSource.data = this.gatewayStats;
      this.resultLength = this.gatewayStats.length;
      this.dataSource.paginator = this.paginator;
      this.setDropdownButton();
      this.isLoadingResults = false;

      this.buildGraphs();
      this.isGatewayStatusVisibleSubject.next();
    });
  }

  setDropdownButton() {
    this.dropdownButton = this.canEdit
      ? {
          label: "LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS",
          editRouterLink: "../../gateway-edit/" + this.gatewayId,
          isErasable: true,
          extraOptions: [],
        }
      : null;

    this.translate.get("GATEWAY.CHANGE-ORGANIZATION.TITLE").subscribe(translation => {
      this.dropdownButton.extraOptions.push({
        id: this.gatewayId,
        label: translation,
        onClick: () => this.onOpenChangeOrganizationDialog(),
      });
    });

    this.translate.get(["LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS"]).subscribe(translations => {
      if (this.dropdownButton) {
        this.dropdownButton.label = translations["LORA-GATEWAY-TABLE-ROW.SHOW-OPTIONS"];
      }
    });
  }

  private buildGraphs() {
    const { receivedDatasets, sentDatasets, labels } = this.gatewayStats
      .slice()
      .reverse()
      .reduce(
        (
          res: {
            receivedDatasets: ChartConfiguration["data"]["datasets"];
            sentDatasets: ChartConfiguration["data"]["datasets"];
            labels: ChartConfiguration["data"]["labels"];
          },
          data
        ) => {
          res.receivedDatasets[0].data.push(data.rxPacketsReceived);
          res.sentDatasets[0].data.push(data.txPacketsEmitted);

          // Formatted to stay consistent with the corresponding table. When more languages are added,
          // register and use them properly. See https://stackoverflow.com/a/54769064
          res.labels.push(formatDate(data.timestamp, "dd MMM", "en-US"));
          return res;
        },
        {
          receivedDatasets: [
            {
              data: [],
              borderColor: ColorGraphBlue1,
              backgroundColor: ColorGraphBlue1,
            },
          ],
          sentDatasets: [
            {
              data: [],
              borderColor: ColorGraphBlue1,
              backgroundColor: ColorGraphBlue1,
            },
          ],
          labels: [],
        }
      );

    this.receivedGraphData = { datasets: receivedDatasets, labels };
    this.sentGraphData = { datasets: sentDatasets, labels };
  }

  onDeleteGateway() {
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (response) {
        this.gatewayService.delete(this.gateway.gatewayId).subscribe(response => {
          if (response.ok && response.body.success === true) {
            this.router.navigate(["gateways"]);
          }
        });
      } else {
        console.log(response);
      }
    });
  }

  onOpenChangeOrganizationDialog() {
    const dialog = this.changeOrganizationDialog.open(GatewayChangeOrganizationDialogComponent, {
      data: {
        gatewayDbId: this.gateway.id,
        organizationId: this.gateway.organizationId,
      } as GatewayDialogModel,
    });

    dialog.afterClosed().subscribe(res => {
      if (!res) return;

      location.reload();
    });
  }

  ngOnDestroy() {
    if (this.gatewaySubscription) {
      this.gatewaySubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
