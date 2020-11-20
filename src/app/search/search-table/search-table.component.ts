import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faBroadcastTower,
  faLayerGroup,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';
import { SearchResultDto, SearchResultType } from '../search-results.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss'],
})
export class SearchTableComponent implements OnInit {
  private readonly faBroadcastTower = faBroadcastTower;
  private readonly faLayerGroup = faLayerGroup;
  private readonly faMicrochip = faMicrochip;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() searchText: string;

  displayedColumns: string[] = ['icon', 'type', 'name', 'id', 'org'];
  dataSource: MatTableDataSource<SearchResultDto>;

  isLoadingResults = true;
  subscription: Subscription;
  isFetching = true;

  searchResults: SearchResultDto[];
  pageLimit = 10;
  pageTotal: number;
  pageOffset = 0;

  pageEvent: PageEvent;

  constructor(
    private globalService: SharedVariableService,
    private router: Router,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.pageOffset = 0;
    this.route.queryParams.subscribe((params) => {
      this.searchText = this.decode(params['q']);
      if (this.searchText != null) {
        this.search(this.searchText, this.pageLimit, 0);
      }
    });
  }

  search(query: string, limit: number, offset: number) {
    this.subscription = this.searchService
      .search(query, limit, offset)
      .subscribe((response) => {
        this.searchResults = response.data;
        this.pageTotal = response.count;
        this.isLoadingResults = false;
        this.isFetching = false;
        this.showResults();
      });
  }

  showResults() {
    if (this.searchResults) {
      if (this.dataSource) {
        this.dataSource.data = this.searchResults;
      } else {
        this.dataSource = new MatTableDataSource(this.searchResults);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = tableSorter;
      }
      this.isLoadingResults = false;
    }
  }

  public getServerData(event?: PageEvent) {
    this.pageLimit = event.pageSize;
    this.pageOffset = event.pageIndex;
    this.search(
      this.searchText,
      event.pageSize,
      event.pageSize * event.pageIndex
    );
    return event;
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

  goToResult(searchResult) {
    if (searchResult.organizationId != null) {
      if (
        this.globalService.getSelectedOrganisationId() !==
        searchResult.organizationId
      ) {
        this.globalService.setValue(searchResult.organizationId);
      }
    }

    if (searchResult.type === SearchResultType.IoTDevice) {
      this.router.navigate([
        '/applications',
        searchResult.applicationId,
        'iot-device',
        searchResult.id,
      ]);
    } else if (searchResult.type === SearchResultType.Application) {
      this.router.navigate(['/applications', searchResult.id]);
    } else if (searchResult.type === SearchResultType.Gateway) {
      this.router.navigate(['/gateways/gateway-detail', searchResult.id]);
    }
  }

  decode(val: string): string {
    if (val === undefined) {
      return '';
    }
    return decodeURIComponent(val);
  }
}
