import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "@environments/environment";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { tableSorter } from "@shared/helpers/table-sorting.helper";
import { MeService } from "@shared/services/me.service";
import { Subscription } from "rxjs";
import { Datatarget, DatatargetData } from "@app/datatarget/datatarget-models/datatarget.model";
import { DatatargetService } from "@app/datatarget/datatarget.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessageService } from "@shared/error-message.service";

@Component({
  selector: "app-datatarget-table",
  templateUrl: "./datatarget-table.component.html",
  styleUrls: ["./datatarget-table.component.scss"],
  standalone: false,
})
export class DatatargetTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ["name", "type", "24h_status", "Iot_devices", "menu"];
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
  public organizationId: number;

  private datatargetSubscription: Subscription;
  private deleteDialogSubscription: Subscription;

  constructor(
    private deleteDialogService: DeleteDialogService,
    private datatargetService: DatatargetService,
    private meService: MeService,
    private sharedService: SharedVariableService,
    private errorMessageService: ErrorMessageService,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    translate.use("da");
  }

  ngOnInit(): void {
    this.organizationId = Number(this.sharedService.getSelectedOrganisationId());
    this.getDatatargets();
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.DataTargetWrite,
      this.organizationId
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDatatargets(): void {
    const organizationId: number = this.organizationId;
    if (!organizationId) return;

    this.datatargetSubscription = this.datatargetService
      .getByOrganizationId(organizationId, this.pageLimit, this.pageOffset * this.pageLimit)
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

  deleteDatatarget(element: any) {
    this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (!response) return;

      this.datatargetService.delete(element.id).subscribe(response => {
        if (response.ok && response.body.affected > 0) {
          this.getDatatargets();
        } else {
          // @ts-ignore
          const errors = this.errorMessageService.handleErrorMessageWithFields(response as HttpErrorResponse);
          this.translate.get(errors.errorMessages.join(" ")).subscribe(translationResponse => {
            this.snackBar.open(translationResponse);
          });
        }
      });
    });
  }

  getIotDeviceCount(dataTarget: Datatarget) {
    return dataTarget.iotDevicesCount ?? 0;
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
