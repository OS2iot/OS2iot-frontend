import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@environments/environment";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { Subscription } from "rxjs";
import { DatatargetLog } from "./datatarget-log.model";
import { DatatargetLogService } from "./datatarget-log.service";

@Component({
  selector: "app-datatarget-log",
  templateUrl: "./datatarget-log.component.html",
  styleUrl: "./datatarget-log.component.scss",
})
export class DatatargetLogComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ["createdAt", "type", "message", "device"];
  pageSizeOptions = DefaultPageSizeOptions;
  pageSize = environment.tablePageSize;

  dataSource = new MatTableDataSource<DatatargetLog>();
  isLoadingResults = true;

  private datatargetLogSubscription: Subscription;

  constructor(datatargetLogService: DatatargetLogService, route: ActivatedRoute) {
    const id: number = +route.parent.snapshot.paramMap.get("datatargetId");

    this.datatargetLogSubscription = datatargetLogService.get(id).subscribe(logs => {
      this.dataSource = new MatTableDataSource<DatatargetLog>(logs);
      this.setViewChildren();
      this.isLoadingResults = false;
    });
  }

  ngAfterViewInit(): void {
    this.setViewChildren();
  }

  ngOnDestroy(): void {
    this.datatargetLogSubscription?.unsubscribe();
  }

  private setViewChildren = () => {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  };
}
