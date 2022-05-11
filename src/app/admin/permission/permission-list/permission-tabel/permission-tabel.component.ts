import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import {
    PermissionGetManyResponse,
    PermissionResponse,
    PermissionType,
} from '../../permission.model';
import { PermissionService } from '../../permission.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
    selector: 'app-permission-tabel',
    templateUrl: './permission-tabel.component.html',
    styleUrls: ['./permission-tabel.component.scss'],
})
export class PermissionTabelComponent implements AfterViewInit {
    displayedColumns: string[] = [
        'name',
        'organisations',
        'members',
        'type',
        'menu',
    ];
    data: PermissionResponse[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() organisationId?: number;
    @Input() userId?: number;

    resultsLength = 0;
    public pageSize = environment.tablePageSize;
    isLoadingResults = true;

    constructor(
        public translate: TranslateService,
        private router: Router,
        private permissionService: PermissionService,
        private deleteDialogService: DeleteDialogService,
        private meService: MeService,
    ) {
        translate.use('da');
    }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.getPermissions(
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
                    return observableOf([]);
                })
            )
            .subscribe((data) => (this.data = data));
    }

    getPermissions(
        orderByColumn: string,
        orderByDirection: string
    ): Observable<PermissionGetManyResponse> {
        return this.permissionService.getPermissions(
            this.paginator.pageSize,
            this.paginator.pageIndex * this.paginator.pageSize,
            orderByColumn,
            orderByDirection,
            this.userId,
            this.organisationId
        );
    }

    routeToPermissions(element: any) {
        this.router.navigate(['admin/permissions', element.id]);
    }

    deletePermission(id: number) {
        this.deleteDialogService.showSimpleDialog().subscribe((response) => {
            if (response) {
                this.permissionService.deletePermission(id).subscribe((response) => {
                    if (response.ok && response.body.affected > 0) {
                        this.refresh();
                    }
                });
            }
        })
    }

    canAccess(element: PermissionResponse) {
        if (element.type === PermissionType.GlobalAdmin) {
            return this.meService.hasGlobalAdmin();
        }
        return this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.UserAdministrationWrite, element.organization.id);
    }

    private refresh() {
        const pageEvent = new PageEvent();
        pageEvent.pageIndex = this.paginator.pageIndex;
        pageEvent.pageSize = this.paginator.pageSize;
        this.paginator.page.emit(pageEvent);
    }
}
