import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { Sort } from '@shared/models/sort.model';
import { UserResponse } from '../../user.model';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'email', 'global', 'status', 'login', 'menu'];
  dataSource = new MatTableDataSource<UserResponse>();

  @Input() isLoadingResults: boolean;
  @Output() deletePermission = new EventEmitter();
  resultsLength = 0;

  @Input() pageLimit: number;
  @Input() selectedSortObject: Sort;
  @Input() users: UserResponse[];
  user: UserResponse;
  public pageOffset = 0;
  public pageTotal: number;
  deleteUser = new EventEmitter();
  public pageSize = environment.tablePageSize;

  constructor(
    public translate: TranslateService,
    private router: Router

  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.users) {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = tableSorter;
      this.isLoadingResults = false;
      this.resultsLength = this.users.length;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
