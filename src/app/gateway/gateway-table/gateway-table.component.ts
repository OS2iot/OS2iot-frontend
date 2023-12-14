import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { TranslateService } from '@ngx-translate/core';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import { faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { Component, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { MeService } from '@shared/services/me.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { environment } from '@environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { DefaultPageSizeOptions } from '@shared/constants/page.constants';
import { TableColumn } from '@shared/types/table.type';

const columnDefinitions: TableColumn[] = [
  {
    id: 'name',
    display: 'LORA-GATEWAY-TABLE.NAME',
    toggleable: false,
    default: true,
  },
  {
    id: 'gateway-id',
    display: 'LORA-GATEWAY-TABLE.GATEWAYID',
    toggleable: true,
    default: true,
  },
  {
    id: 'internalOrganizationName',
    display: 'LORA-GATEWAY-TABLE.ORGANIZATION',
    toggleable: true,
    default: true,
  },
  {
    id: 'rxPacketsReceived',
    display: 'LORA-GATEWAY-TABLE.PACKETS-RECEIVED',
    toggleable: true,
    default: true,
  },
  {
    id: 'txPacketsEmitted',
    display: 'LORA-GATEWAY-TABLE.PACKETS-SENT',
    toggleable: true,
    default: true,
  },
  {
    id: 'tags',
    display: 'LORA-GATEWAY-TABLE.TAGS',
    toggleable: true,
    default: false,
  },
  {
    id: 'location',
    display: 'LORA-GATEWAY-TABLE.LOCATION',
    toggleable: true,
    default: false,
  },
  {
    id: 'createdAt',
    display: 'LORA-GATEWAY-TABLE.CREATED-AT',
    toggleable: true,
    default: false,
  },
  {
    id: 'last-seen',
    display: 'LORA-GATEWAY-TABLE.LAST-SEEN-AT',
    toggleable: true,
    default: true,
  },
  {
    id: 'status',
    display: 'LORA-GATEWAY-TABLE.STATUS',
    toggleable: true,
    default: true,
  },
  {
    id: 'menu',
    display: '',
    toggleable: false,
    default: true,
  },
];

@Component({
    selector: 'app-gateway-table',
    templateUrl: './gateway-table.component.html',
    styleUrls: ['./gateway-table.component.scss'],
})
export class GatewayTableComponent implements AfterViewInit, OnDestroy {
    @Input() organisationChangeSubject: Subject<any>;
    organizationId?: number;
    displayedColumns: string[] = [
        'name',
        'gateway-id',
        'location',
        'internalOrganizationName',
        'last-seen',
        'status',
        'menu',
    ];
    data: Gateway[] = [];
    dataSource: MatTableDataSource<Gateway>;
    public pageSize = environment.tablePageSize;
    public pageSizeOptions = DefaultPageSizeOptions;

    faExclamationTriangle = faExclamationTriangle;
    faCheckCircle = faCheckCircle;
    refetchIntervalId: NodeJS.Timeout;
    batteryStatusColor = 'green';
    batteryStatusPercentage = 50;
    resultsLength = 0;
    isLoadingResults = true;
    private fetchSubscription: Subscription;

  gatewayTableSavedColumns = 'gatewayTableSavedColumns';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private chirpstackGatewayService: ChirpstackGatewayService,
        public translate: TranslateService,
        private meService: MeService,
        private deleteDialogService: DeleteDialogService
    ) {
        this.translate.use('da');
        moment.locale('da');
    }

    ngAfterViewInit() {
        this.fetchSubscription = this.organisationChangeSubject.subscribe((x) => {
            this.organizationId = x;
            this.refresh();
        });
        this.refetchIntervalId = setInterval(() => this.refresh(), 60 * 1000);
        this.refresh();
    }

    ngOnDestroy() {
        clearInterval(this.refetchIntervalId);
        this.fetchSubscription.unsubscribe();
    }

    private refresh() {
        this.getGateways().subscribe((data) => {
            data.resultList.forEach((gw) => {
        gw.canEdit = this.canEdit(gw.organizationId);
        gw.tagsString = JSON.stringify(gw.tags ?? {});
            });
            this.data = data.resultList;
            this.resultsLength = data.totalCount;
            this.isLoadingResults = false;
            this.dataSource = new MatTableDataSource(this.data);
            this.dataSource.sortingDataAccessor = tableSorter;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    canEdit(internalOrganizationId: number): boolean {
        return this.meService.hasAccessToTargetOrganization(
            OrganizationAccessScope.GatewayWrite,
            internalOrganizationId
        );
    }

    private getGateways(): Observable<GatewayResponseMany> {
        const params = {
            limit: this.paginator.pageSize,
            offset: this.paginator.pageIndex * this.paginator.pageSize,
        };
        if (this.organizationId > 0) {
            params['organizationId'] = this.organizationId;
        }
        return this.chirpstackGatewayService.getMultiple(params);
    }

    gatewayStatus(gateway: Gateway): boolean {
        return this.chirpstackGatewayService.isGatewayActive(gateway);
    }

    lastActive(gateway: Gateway): string {
        if (gateway?.lastSeenAt) {
            const date = gateway.lastSeenAt ?? gateway.lastSeenAt

            const lastSeenAtUnixTimestamp = moment(date).valueOf();
            const now = moment(new Date()).valueOf();
            return moment(Math.min(lastSeenAtUnixTimestamp, now)).fromNow();
        } else {
            return this.translate.instant('ACTIVITY.NEVER');
        }
    }

  clickDelete(element: Gateway) {
    this.deleteGateway(element.gatewayId);
    }

  deleteGateway(gatewayId: string) {
        this.deleteDialogService.showSimpleDialog().subscribe((response) => {
            if (response) {
        this.chirpstackGatewayService
          .delete(gatewayId)
          .subscribe((response) => {
            if (response.ok && response.body.success === true) {
              this.refresh();
            }
          });
            } else {
                console.error(response);
            }
        });
    }

  protected readonly columnDefinitions = columnDefinitions;
}
