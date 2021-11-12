import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Application, ApplicationData } from '@applications/application.model';
import { ApplicationService } from '@applications/application.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DeviceType } from '@shared/enums/device-type';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-applications-table',
  styleUrls: ['./applications-table.component.scss'],
  templateUrl: './applications-table.component.html',
})
export class ApplicationsTableComponent implements AfterViewInit, OnInit {
  @Input() organizationId: number;
  @Input() permissionId: number;
  displayedColumns: string[] = ['name', 'devices', 'menu'];
  data: Application[] = [];

  public pageSize = environment.tablePageSize;
  resultsLength = 0;
  isLoadingResults = true;
  public errorMessage: string;
  public canEdit = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public translate: TranslateService,
    private applicationService: ApplicationService,
    private router: Router,
    private meService: MeService,
    private deleteDialogService: DeleteDialogService
  ) {}

  ngOnInit() {
    this.canEdit = this.meService.canWriteInTargetOrganization();
  }

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
    let message: string;

    if (this.canBeDeleted(id)) {
      return;
    }

    if (this.applicationHasDevices(id)) {
      message = this.translate.instant('APPLICATION.DELETE-HAS-DEVICES-PROMPT');
    }

    this.deleteDialogService.showSimpleDialog(message).subscribe((response) => {
      if (response) {
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
    });
  }

  applicationHasDevices(id: number): boolean {
    const applicationToDelete = this.data?.find((app) => app.id === id);
    return applicationToDelete && applicationToDelete.iotDevices.length > 0;
  }

  applicationHasSigFoxDevices(id: number): boolean {
    const applicationToDelete = this.data?.find((app) => app.id === id);
    const checkForSigfox = applicationToDelete.iotDevices.find((device) => {
      return device.type === DeviceType.SIGFOX;
    });
    if (checkForSigfox) {
      return true;
    } else return false;
  }

  canBeDeleted(id: number): boolean {
    let message: string;

    if (this.applicationHasSigFoxDevices(id)) {
      message = this.translate.instant(
        'APPLICATION.DELETE-HAS-SIGFOX-DEVICES-PROMPT'
      );
      this.deleteDialogService
        .showSimpleDialog(
          message,
          false,
          true,
          false,
          this.translate.instant('APPLICATION.DELETE')
        )
        .subscribe();
      return true;
    } else {
      return false;
    }
  }

  navigateToEditPage(applicationId: string) {
    this.router.navigate(['applications', 'edit-application', applicationId]);
  }
}
