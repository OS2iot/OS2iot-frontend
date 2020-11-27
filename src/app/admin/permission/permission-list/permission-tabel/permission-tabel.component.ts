import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { tableSorter } from '@shared/helpers/table-sorting.helper';
import { PermissionResponse } from '../../permission.model';


@Component({
  selector: 'app-permission-tabel',
  templateUrl: './permission-tabel.component.html',
  styleUrls: ['./permission-tabel.component.scss'],
})
export class PermissionTabelComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['name', 'organisations', 'members', 'type', 'menu'];
  dataSource = new MatTableDataSource<PermissionResponse>();
  permission: PermissionResponse;
  @Input() permissions: PermissionResponse[];
  @Input() isLoadingResults: boolean;
  @Output() deletePermission = new EventEmitter();
  resultsLength = 0;
  public pageSize = environment.tablePageSize;

  constructor(
    public translate: TranslateService,
    private router: Router
  ) {
    translate.use('da');
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.permissions) {
      this.dataSource = new MatTableDataSource(this.permissions);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = tableSorter;
      this.isLoadingResults = false;
      this.resultsLength = this.permissions.length;
    }
  }


  tableDeletePermission(id: number) {
    console.log("table")
    this.deletePermission.emit(id);
  }

  clickDelete(element: any) {
    this.deletePermission.emit(element.id);
  }

  routeToPermissions(element: any) {
    this.router.navigate(['admin/permissions', element.id]);
  }
}
