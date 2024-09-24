import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@environments/environment";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { tableSorter } from "@shared/helpers/table-sorting.helper";
import { MeService } from "@shared/services/me.service";
import { Subscription } from "rxjs";
import { Datatarget, DatatargetData } from "../datatarget.model";
import { DatatargetService } from "../datatarget.service";

@Component({
  selector: "app-datatarget-table",
  templateUrl: "./datatarget-table.component.html",
  styleUrls: ["./datatarget-table.component.scss"],
})
export class DatatargetTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ["name", "type", "24h_status", "menu"];
  dataSource = new MatTableDataSource<Datatarget>();
  datatargets: Datatarget[];
  resultsLength = 0;
  public canEdit = false;
  @Input() isLoadingResults = true;
  public pageSize = environment.tablePageSize;
  pageSizeOptions = DefaultPageSizeOptions;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;

  @Input() pageLimit: number;
  public pageOffset = 0;
  public pageTotal: number;
  public applicationId: number;

  private datatargetSubscription: Subscription;
  private deleteDialogSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private deleteDialogService: DeleteDialogService,
    private datatargetService: DatatargetService,
    private meService: MeService,
    public translate: TranslateService
  ) {
    translate.use("da");
  }

  ngOnInit(): void {
    this.applicationId = +Number(this.route.parent.snapshot.paramMap.get("id"));
    this.getDatatarget();
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.applicationId
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDatatarget(): void {
    const appId: number = this.applicationId;
    if (appId) {
      this.datatargetSubscription = this.datatargetService
        .getByApplicationId(this.pageLimit, this.pageOffset * this.pageLimit, appId)
        .subscribe((datatargets: DatatargetData) => {
          this.datatargets = datatargets.data;
          this.dataSource = new MatTableDataSource<Datatarget>(this.datatargets);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.sortingDataAccessor = tableSorter;
          this.isLoadingResults = false;
          if (this.pageLimit) {
            this.pageTotal = Math.ceil(datatargets.count / this.pageLimit);
          }
        });
    }
  }

  deleteDatatarget(element: any) {
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (response) {
        this.datatargetService.delete(element.id).subscribe(response => {
          if (response.ok && response.body.affected > 0) {
            this.getDatatarget();
          }
        });
      } else {
        console.log(response);
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    if (this.datatargetSubscription) {
      this.datatargetSubscription.unsubscribe();
    }
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
