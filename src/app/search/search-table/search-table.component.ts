import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faBroadcastTower, faLayerGroup, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { SearchResultDto, SearchResultType } from '../search-results.model';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit, OnChanges {
  faBroadcastTower = faBroadcastTower;
  faLayerGroup = faLayerGroup;
  faMicrochip = faMicrochip;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  displayedColumns: string[] = ['icon', 'type', 'name', 'id', 'org'];
  public dataSource = new MatTableDataSource<SearchResultDto>();

  resultsLength = 0;
  @Input() isLoadingResults: boolean;
  @Input() searchText: string;

  @Input() searchResults: SearchResultDto[];
  searchResult: SearchResultDto;


  constructor(
    private globalService: SharedVariableService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    if (this.searchResults) {
      this.dataSource = new MatTableDataSource(this.searchResults);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
      this.resultsLength = this.searchResults.length;
    }
  }



  getIcon(type: SearchResultType) {
    if (type === SearchResultType.IoTDevice) {
      return this.faMicrochip;
    } else if (type === SearchResultType.Application) {
      return this.faLayerGroup;
    } else if (type === SearchResultType.Gateway) {
      return this.faBroadcastTower;
    } else {
      return '';
    }
  }

  goToResult() {
    if (this.searchResult.organizationId != null) {
      if (
        this.globalService.getSelectedOrganisationId() !==
        this.searchResult.organizationId
      ) {
        this.globalService.setValue(this.searchResult.organizationId);
      }
    }

    if (this.searchResult.type === SearchResultType.IoTDevice) {
      this.router.navigate([
        '/applications',
        this.searchResult.applicationId,
        'iot-device',
        this.searchResult.id,
      ]);
    } else if (this.searchResult.type === SearchResultType.Application) {
      this.router.navigate(['/applications', this.searchResult.id]);
    } else if (this.searchResult.type === SearchResultType.Gateway) {
      this.router.navigate(['/gateways/gateway-detail', this.searchResult.id]);
    }
  }

}
