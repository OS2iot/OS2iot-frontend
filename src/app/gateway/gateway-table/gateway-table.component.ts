import { Component, OnInit, OnChanges, OnDestroy, Input, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { ChirpstackGatewayService } from 'src/app/shared/services/chirpstack-gateway.service';
import { TranslateService } from '@ngx-translate/core';
import { Gateway } from '../gateway.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { MeService } from '@shared/services/me.service';
import { environment } from '@environments/environment';
import { Output } from '@angular/core';
import { createKeywordTypeNode } from 'typescript';


@Component({
  selector: 'app-gateway-table',
  templateUrl: './gateway-table.component.html',
  styleUrls: ['./gateway-table.component.scss']
})
export class GatewayTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'gateway-id', 'location', 'internalOrganizationName', 'last-seen', 'status', 'menu'];
  public dataSource = new MatTableDataSource<Gateway>();
  public pageSize = environment.tablePageSize;
  gateway: Gateway;
  @Input() gateways: Gateway[];
  @Input() isLoadingResults = true;
  @Output() deleteGateway = new EventEmitter();
  filteredGateways: Gateway[];

  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;

  batteryStatusColor = 'green';
  batteryStatusPercentage = 50;
  resultsLength = 0;

  constructor(
    private chirpstackGatewayService: ChirpstackGatewayService,
    public translate: TranslateService) {
    this.translate.use('da');
    moment.locale('da');
  }

  ngOnInit(): void { }

  ngOnChanges() {
    if (this.gateways) {
      this.dataSource = new MatTableDataSource(this.gateways);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = tableSorter;
      this.isLoadingResults = false;
      this.resultsLength = this.gateways.length;
    }
  }

  gatewayStatus(gateway: Gateway): boolean {
    return this.chirpstackGatewayService.isGatewayActive(gateway);
  }

  lastActive(gateway: Gateway): string {
    if (gateway?.lastSeenAt) {
      return moment(gateway.lastSeenAt).fromNow();
    } else {
      return this.translate.instant('ACTIVITY.NEVER');
    }
  }

  clickDelete(element: any) {
    this.deleteGateway.emit(element.id);
  }

}
