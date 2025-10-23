import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { OrganisationGetManyResponse, OrganisationResponse } from "../../organisation.model";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { MatSort } from "@angular/material/sort";
import { merge, Observable, of as observableOf } from "rxjs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { environment } from "@environments/environment";
import { startWith, switchMap, map, catchError } from "rxjs/operators";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { ErrorMessageService } from "@shared/error-message.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-organisation-tabel",
    templateUrl: "./organisation-tabel.component.html",
    styleUrls: ["./organisation-tabel.component.scss"],
    standalone: false
})
export class OrganisationTabelComponent implements AfterViewInit {
  displayedColumns: string[] = ["name", "applications", "menu"];

  data: OrganisationResponse[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() organisationId?: number;
  @Input() userId?: number;

  resultsLength = 0;
  public pageSize = environment.tablePageSize;
  pageSizeOptions = DefaultPageSizeOptions;

  isLoadingResults = true;
  public errorMessages: string[];

  constructor(
    private organisationService: OrganisationService,
    private deleteDialogService: DeleteDialogService,
    private errorMessageService: ErrorMessageService
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getOrganisations(this.sort.active, this.sort.direction);
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
      .subscribe(data => (this.data = data));
  }

  getOrganisations(orderByColumn: string, orderByDirection: string): Observable<OrganisationGetManyResponse> {
    return this.organisationService.getMultiple(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByColumn,
      orderByDirection
    );
  }

  clickDelete(element: any) {
    this.deleteDialogService.showSimpleDialog().subscribe(response => {
      if (response) {
        this.organisationService.delete(element.id).subscribe(response => {
          if (response instanceof HttpErrorResponse) {
            this.errorMessages = this.errorMessageService.handleErrorMessageWithFields(response).errorMessages;
            return;
          }
          if (response.ok) {
            this.refresh();
          }
        });
      } else {
        console.log(response);
      }
    });
  }

  private refresh() {
    const pageEvent = new PageEvent();
    pageEvent.pageIndex = this.paginator.pageIndex;
    pageEvent.pageSize = this.paginator.pageSize;
    this.paginator.page.emit(pageEvent);
  }
}
