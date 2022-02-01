import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiKeyGetManyResponse, ApiKeyResponse } from '../../api-key.model';
import { ApiKeyService } from '../../api-key.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-api-key-table',
  templateUrl: './api-key-table.component.html',
  styleUrls: ['./api-key-table.component.scss'],
})
export class ApiKeyTableComponent implements AfterViewInit {
  @Input() organisationId: number;
  displayedColumns: string[] = [
    'name',
    'permissions',
    'key',
    'menu',
  ];
  data: ApiKeyResponse[] = [];
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;
  public pageSize = environment.tablePageSize;

  constructor(
    private meService: MeService,
    private router: Router,
    private apiKeyService: ApiKeyService,
    private deleteDialogService: DeleteDialogService
  ) {}

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getApiKeysByOrganisationId(
            this.sort.active,
            this.sort.direction
          );
        }),
        map((data) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.count;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  getApiKeysByOrganisationId(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<ApiKeyGetManyResponse> {
    return this.apiKeyService.getApiKeys(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByColumn,
      orderByDirection,
      null,
      this.organisationId
    );
  }

  canAccess(_element: ApiKeyResponse) {
    return this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.UserAdministrationWrite,
      this.organisationId
    );
  }

  routeToPermissions(element: any) {
    this.router.navigate(['admin/api-key', element.id]);
  }

  deleteApiKey(id: number) {
    this.deleteDialogService.showSimpleDialog().subscribe((response) => {
      if (response) {
        this.apiKeyService.delete(id).subscribe((response) => {
          if (response.ok && response.body.affected > 0) {
            this.refresh();
          }
        });
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
