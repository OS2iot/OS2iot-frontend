import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TranslateService } from "@ngx-translate/core";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { UserGetManyResponse, UserResponse } from "../../user.model";
import { UserService } from "../../user.service";
import { merge, Observable, of as observableOf } from "rxjs";
import { environment } from "@environments/environment";
import { DefaultPageSizeOptions } from "@shared/constants/page.constants";
import { MeService } from "@shared/services/me.service";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"],
  standalone: false,
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = ["name", "email", "global", "status", "expiresOn", "lastLogin", "menu"];
  data: UserResponse[];

  public pageSize = environment.tablePageSize;
  pageSizeOptions = DefaultPageSizeOptions;
  resultsLength = 0;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // If supplied, users will only be retrieved for the specified organization
  // If supplied, permissionId will ignored, even if supplied
  @Input() organizationId?: number;

  // If supplied, users will be retrieved on the permissionId (userGroup/brugerGruppe)
  @Input() permissionId?: number;

  @Input() canSort = true;
  isGlobalAdmin: boolean;

  constructor(public translate: TranslateService, private userService: UserService, private meService: MeService) {
    this.isGlobalAdmin = this.meService.hasGlobalAdmin();
  }

  getUsers(orderByColumn: string, orderByDirection: string): Observable<UserGetManyResponse> {
    if (this.organizationId !== null && this.organizationId !== undefined) {
      if (this.isGlobalAdmin) {
        return this.userService.getMultiple(
          this.paginator.pageSize,
          this.paginator.pageIndex * this.paginator.pageSize,
          orderByColumn,
          orderByDirection
        );
      } else {
        return this.userService.getMultipleByOrganization(
          this.paginator.pageSize,
          this.paginator.pageIndex * this.paginator.pageSize,
          orderByColumn,
          orderByDirection,
          this.organizationId
        );
      }
    } else {
      return this.userService.getMultiple(
        this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize,
        orderByColumn,
        orderByDirection,
        this.permissionId
      );
    }
  }

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
}
