import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { environment } from "@environments/environment";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { GatewayDialogModel } from "@shared/models/dialog.model";
import { MeService } from "@shared/services/me.service";
import { TableColumn } from "@shared/types/table.type";
import moment from "moment";
import { merge, Observable, Subject, Subscription } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { ChirpstackGatewayService } from "src/app/shared/services/chirpstack-gateway.service";
import { GatewayChangeOrganizationDialogComponent } from "../gateway-change-organization-dialog/gateway-change-organization-dialog.component";
import { Gateway, GatewayResponseMany } from "../gateway.model";

const columnDefinitions: TableColumn[] = [
  {
    id: "name",
    display: "LORA-GATEWAY-TABLE.NAME",
    toggleable: false,
    default: true,
  },
  {
    id: "gatewayId",
    display: "LORA-GATEWAY-TABLE.ID",
    toggleable: true,
    default: true,
  },
  {
    id: "organizationName",
    display: "LORA-GATEWAY-TABLE.ORGANIZATION",
    toggleable: true,
    default: true,
  },
  {
    id: "rxPacketsReceived",
    display: "LORA-GATEWAY-TABLE.PACKETS-RECEIVED",
    toggleable: true,
    default: true,
  },
  {
    id: "txPacketsEmitted",
    display: "LORA-GATEWAY-TABLE.PACKETS-SENT",
    toggleable: true,
    default: true,
  },
  {
    id: "placement",
    display: "LORA-GATEWAY-TABLE.PLACEMENT",
    toggleable: true,
    default: false,
  },
  {
    id: "modelName",
    display: "LORA-GATEWAY-TABLE.MODEL-NAME",
    toggleable: true,
    default: false,
  },
  {
    id: "antennaType",
    display: "LORA-GATEWAY-TABLE.ANTENNA-TYPE",
    toggleable: true,
    default: false,
  },
  {
    id: "status",
    display: "LORA-GATEWAY-TABLE.STATUS",
    toggleable: true,
    default: false,
  },
  {
    id: "gatewayResponsibleName",
    display: "LORA-GATEWAY-TABLE.RESPONSIBLE-NAME",
    toggleable: true,
    default: false,
  },
  {
    id: "tags",
    display: "LORA-GATEWAY-TABLE.TAGS",
    toggleable: true,
    default: false,
  },
  {
    id: "createdAt",
    display: "LORA-GATEWAY-TABLE.CREATED-AT",
    toggleable: true,
    default: false,
  },
  {
    id: "lastSeenAt",
    display: "LORA-GATEWAY-TABLE.LAST-SEEN-AT",
    toggleable: true,
    default: true,
  },
  {
    id: "onlineStatus",
    display: "LORA-GATEWAY-TABLE.STATUS",
    toggleable: true,
    default: true,
  },
  {
    id: "menu",
    display: "",
    toggleable: false,
    default: true,
  },
];

@Component({
  selector: "app-gateway-table",
  templateUrl: "./gateway-table.component.html",
  styleUrls: ["./gateway-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GatewayTableComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() organisationChangeSubject: Subject<any>;
  organizationId?: number;
  displayedColumns: string[] = [];
  data: Gateway[] = [];
  public pageSize = environment.tablePageSize;
  public pageSizeOptions = DefaultPageSizeOptions;

  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;
  refetchIntervalId: NodeJS.Timeout;
  resultsLength = 0;
  isLoadingResults = true;
  gatewayTableSavedColumns = "gatewayTableSavedColumns";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  protected readonly columnDefinitions = columnDefinitions;
  private fetchSubscription: Subscription;

  constructor(
    private chirpstackGatewayService: ChirpstackGatewayService,
    public translate: TranslateService,
    private meService: MeService,
    private deleteDialogService: DeleteDialogService,
    private cdRef: ChangeDetectorRef,
    private changeOrganizationDialog: MatDialog
  ) {
    this.translate.use("da");
    moment.locale("da");
  }

  ngOnInit() {
    // Detect changes done by child column selector
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.fetchSubscription = this.organisationChangeSubject.subscribe(x => {
      this.organizationId = x;
      this.refresh();
    });
    this.refetchIntervalId = setInterval(() => this.refresh(), 60 * 1000);

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // TODO: Much of this is deprecated and should be redesigned, same case for the other tables
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getGateways(this.sort.active, this.sort.direction);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.totalCount;

          return data.resultList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return [];
        })
      )
      .subscribe(data => {
        this.data = data;
        data.forEach(gw => {
          gw.canEdit = this.canEdit(gw.organizationId);
          gw.tagsString = JSON.stringify(gw.tags ?? {});
        });
      });
  }

  ngOnDestroy() {
    clearInterval(this.refetchIntervalId);
    this.fetchSubscription.unsubscribe();
  }

  canEdit(internalOrganizationId: number): boolean {
    return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.GatewayWrite, internalOrganizationId);
  }

  gatewayStatus(gateway: Gateway): boolean {
    return this.chirpstackGatewayService.isGatewayActive(gateway);
  }

  lastActive(gateway: Gateway): string {
    if (gateway?.lastSeenAt) {
      const date = gateway.lastSeenAt;

      const lastSeenAtUnixTimestamp = moment(date).valueOf();
      const now = moment(new Date()).valueOf();
      return moment(Math.min(lastSeenAtUnixTimestamp, now)).fromNow();
    } else {
      return this.translate.instant("ACTIVITY.NEVER");
    }
  }

  clickDelete(element: Gateway) {
    this.deleteGateway(element.gatewayId);
  }

  deleteGateway(gatewayId: string) {
    this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (response) {
        this.chirpstackGatewayService.delete(gatewayId).subscribe(response => {
          if (response.ok && response.body.success === true) {
            this.refresh();
          }
        });
      } else {
        console.error(response);
      }
    });
  }

  onOpenChangeOrganizationDialog(id: number) {
    this.changeOrganizationDialog.open(GatewayChangeOrganizationDialogComponent, {
      data: {
        gatewayDbId: id,
      } as GatewayDialogModel,
    });
  }

  announceSortChange(event: { active: string; direction: string }) {
    this.columnDefinitions.find(column => column.id === event.active).sort = event.direction as "asc" | "desc";
  }

  getSortDirection(id: string) {
    return columnDefinitions.find(c => c.id === id).sort;
  }

  private refresh() {
    this.getGateways(this.sort.active, this.sort.direction).subscribe(data => {
      data.resultList.forEach(gw => {
        gw.canEdit = this.canEdit(gw.organizationId);
        gw.tagsString = JSON.stringify(gw.tags ?? {});
      });
      this.data = data.resultList;
      this.resultsLength = data.totalCount;
      this.isLoadingResults = false;
    });
  }

  private getGateways(orderByColumn: string, orderByDirection: string): Observable<GatewayResponseMany> {
    const params = {
      limit: this.paginator.pageSize,
      offset: this.paginator.pageIndex * this.paginator.pageSize,
      orderOn: orderByColumn,
      sort: orderByDirection,
    };
    if (this.organizationId > 0) {
      params["organizationId"] = this.organizationId;
    }
    return this.chirpstackGatewayService.getMultiple(params);
  }
}
