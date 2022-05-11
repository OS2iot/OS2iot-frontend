import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { TranslateService } from '@ngx-translate/core';
import { Gateway, GatewayResponseMany } from '../gateway.model';
import {
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MeService } from '@shared/services/me.service';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { environment } from '@environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-gateway-table',
  templateUrl: './gateway-table.component.html',
  styleUrls: ['./gateway-table.component.scss'],
})
export class GatewayTableComponent implements AfterViewInit {
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

  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;

  batteryStatusColor = 'green';
  batteryStatusPercentage = 50;
  resultsLength = 0;
  isLoadingResults = true;

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
    this.organisationChangeSubject.subscribe((x) => {
      this.organizationId = x;
      this.refresh();
    });

    this.refresh();
  }

  private refresh() {
    this.getGateways().subscribe((data) => {
      data.result.forEach((gw) => {
        gw.canEdit = this.canEdit(gw.internalOrganizationId);
      });
      this.data = data.result;
      this.resultsLength = data.totalCount;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sortingDataAccessor = tableSorter;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  canEdit(internalOrganizationId: number): boolean {
    return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.GatewayWrite, internalOrganizationId);
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
      const lastSeenAtUnixTimestamp = moment(gateway?.lastSeenAt).valueOf();
      const now = moment(new Date()).valueOf();
      return moment(Math.min(lastSeenAtUnixTimestamp, now)).fromNow();
    } else {
      return this.translate.instant('ACTIVITY.NEVER');
    }
  }

  clickDelete(element) {
    this.deleteGateway(element.id);
  }

  deleteGateway(id: string) {
    this.deleteDialogService.showSimpleDialog().subscribe((response) => {
      if (response) {
        this.chirpstackGatewayService.delete(id).subscribe((response) => {
          if (response.ok && response.body.success === true) {
            this.refresh();
          }
        });
      } else {
        console.error(response);
      }
    });
  }
}
