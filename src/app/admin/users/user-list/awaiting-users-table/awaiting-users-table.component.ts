import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { UserGetManyResponse, UserResponse } from '../../user.model';
import { UserService } from '../../user.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { environment } from '@environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-awaiting-users-table',
  templateUrl: './awaiting-users-table.component.html',
  styleUrls: ['./awaiting-users-table.component.scss'],
})
export class AwaitingUsersTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'menu'];
  data: UserResponse[];

  public pageSize = environment.tablePageSize;
  resultsLength = 0;
  isLoadingResults = true;
  orgId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() permissionId?: number;
  @Input() canSort = true;

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private sharedService: SharedVariableService
  ) {}

  getUsers(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<UserGetManyResponse> {
    return this.userService.getAwaitingUsers(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      this.orgId,
      orderByColumn,
      orderByDirection
    );
  }

  ngAfterViewInit() {
    this.orgId = this.sharedService.getSelectedOrganisationId();
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getUsers(this.sort.active, this.sort.direction);
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
}
