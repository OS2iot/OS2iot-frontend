import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {
  RejectUserDto,
  UserGetManyResponse,
  UserResponse,
  UserResponsePerRequestedOrganization,
} from '../../user.model';
import { UserService } from '../../user.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { environment } from '@environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { DefaultPageSizeOptions } from '@shared/constants/page.constants';

@Component({
  selector: 'app-awaiting-users-table',
  templateUrl: './awaiting-users-table.component.html',
  styleUrls: ['./awaiting-users-table.component.scss'],
})
export class AwaitingUsersTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'menu'];
  users: UserResponsePerRequestedOrganization[];

  public pageSize = environment.tablePageSize;
  pageSizeOptions = DefaultPageSizeOptions;

  resultsLength = 0;
  public errorMessage: string;
  isLoadingResults = true;
  message: string;
  infoTitle: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() permissionId?: number;
  @Input() canSort = true;

  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private sharedService: SharedVariableService,
    private deleteDialogService: DeleteDialogService
  ) {}

  ngAfterViewInit() {
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
          return observableOf([] as UserResponse[]);
        })
      )
      .subscribe((userResponses) => {
        this.users = [];

        // Flatten users so each table row is exactly one request
        for (const response of userResponses) {
          const { requestedOrganizations, ...user} = response;

          for (const organizationId of response.requestedOrganizations) {
            this.users.push({
              ...user,
              requestedOrganization: organizationId,
            });
          }
        }
      });

    this.translate
      .get(['USERS.DIALOG.QUESTION-REJECT', 'USERS.DIALOG.HEAD-REJECT'])
      .subscribe((translations) => {
        this.message = translations['USERS.DIALOG.QUESTION-REJECT'];
        this.infoTitle = translations['USERS.DIALOG.HEAD-REJECT'];
      });
  }

  getUsers(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<UserGetManyResponse> {
    return this.userService.getAwaitingUsers(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByColumn,
      orderByDirection
    );
  }

  rejectUser(userId: number, organizationId: number) {
    this.deleteDialogService
      .showSimpleDialog(this.message, false, true, false, this.infoTitle, true)
      .subscribe((response) => {
        if (response) {
          const rejectUserOrgDto: RejectUserDto = {
            orgId: organizationId,
            userIdToReject: userId,
          };

          this.userService
            .rejectUser(rejectUserOrgDto)
            .subscribe((response) => {
              if (response) {
                this.paginator.page.emit({
                  pageIndex: this.paginator.pageIndex,
                  pageSize: this.paginator.pageSize,
                  length: this.resultsLength,
                });
              } else {
                this.errorMessage = response?.name;
              }
            });
        }
      });
  }
}
