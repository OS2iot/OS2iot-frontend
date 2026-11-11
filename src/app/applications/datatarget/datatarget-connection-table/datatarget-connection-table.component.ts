import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { DataTargetConnection, DataTargetConnectionGetManyResponse } from "@payload-decoder/payload-device-data.model";
import { DatatargetConnectionService } from "@payload-decoder/datatarget-connection.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { environment } from "@environments/environment";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { merge, of as observableOf } from "rxjs";
import { ApplicationService } from "@applications/application.service";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { SnackService } from "@shared/services/snack.service";

@Component({
  selector: "app-datatarget-connection-table",
  templateUrl: "./datatarget-connection-table.component.html",
  styleUrl: "./datatarget-connection-table.component.scss",
  standalone: false,
})
export class DataTargetConnectionTableComponent implements OnInit, AfterViewInit {
  public canEdit: boolean = false;
  public connections: DataTargetConnection[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ["name", "payload-decoder", "devices", "isDefault", "menu"];
  public pageSize = environment.tablePageSize;
  public pageSizeOptions = DefaultPageSizeOptions;
  public isLoadingResults = false;
  public resultsLength = 0;

  private applicationId: number;

  constructor(
    private meService: MeService,
    private deleteDialogService: DeleteDialogService,
    private dataTargetConnectionService: DatatargetConnectionService,
    private applicationService: ApplicationService,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.applicationId = this.applicationService.id;
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.applicationId
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getDataTargetConnections(this.sort.active, this.sort.direction);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.connections = data;
      });
  }

  getDataTargetConnections(orderByColumn: string, orderByDirection: string) {
    return this.dataTargetConnectionService
      .getByApplication(
        this.applicationId,
        this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize,
        orderByColumn,
        orderByDirection
      )
      .pipe(
        map((connections: DataTargetConnectionGetManyResponse) => {
          return connections;
        })
      );
  }

  deleteConnection(element: DataTargetConnection) {
    this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (!response) return;

      this.dataTargetConnectionService.delete(element.id).subscribe(response => {
        if (response.ok && response.body.affected > 0) {
          this.paginator.page.emit({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            length: this.resultsLength,
          });
          this.snackService.showDeletedSnack();
        } else {
          this.snackService.showFailSnack();
        }
      });
    });
  }
}
