import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Application, ApplicationData } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-applications-table',
  styleUrls: ['./applications-table.component.scss'],
  templateUrl: './applications-table.component.html',
})
export class ApplicationsTableComponent implements AfterViewInit {
  @Input() organizationId: number;
  @Input() permissionId: number;
  displayedColumns: string[] = ['name', 'devices', 'updatedAt', 'menu'];
  data: Application[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  public errorMessage: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getApplications(this.sort.active, this.sort.direction);
        }),
        map((data) => {
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
      .subscribe((data) => (this.data = data));
  }

  getApplications(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<ApplicationData> {
    return this.applicationService.getApplications(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByDirection,
      orderByColumn,
      this.organizationId,
      this.permissionId
    );
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.paginator.page.emit({
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize,
          length: this.resultsLength,
        });
      } else {
        this.errorMessage = response?.error?.message;
      }
    });
  }

  navigateToEditPage(applicationId: string) {
    this.router.navigate(['applications', 'edit-application', applicationId]);
  }
}
