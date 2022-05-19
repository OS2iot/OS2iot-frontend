import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { MeService } from '@shared/services/me.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { DeviceModelService } from '../device-model.service';
import { DeviceModel, DeviceModelResponse } from '../device.model';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-device-model-table',
  templateUrl: './device-model-table.component.html',
  styleUrls: ['./device-model-table.component.scss'],
})
export class DeviceModelTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public data: DeviceModel[];
  public displayedColumns: string[] = ['name', 'id', 'menu'];
  public pageSize = environment.tablePageSize;
  public isLoadingResults = false;
  public resultsLength = 0;
  deleteDialogSubscription: Subscription;
  errorTitle: string;
  public canEdit = false;

  constructor(
    private sharedVariableService: SharedVariableService,
    private deviceModelService: DeviceModelService,
    private deleteDialogservice: DeleteDialogService,
    private translateService: TranslateService,
    private meService: MeService
  ) {}

  ngOnInit(): void {
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
    this.translateService
      .get(['DEVICE-MODEL.DELETE-FAILED'])
      .subscribe((translations) => {
        this.errorTitle = translations['DEVICE-MODEL.DELETE-FAILED'];
      });
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getDeviceModels(this.sort.active, this.sort.direction);
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

  getDeviceModels(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<DeviceModelResponse> {
    return this.deviceModelService.getMultiple(
      this.paginator.pageSize,
      this.paginator.pageIndex * this.paginator.pageSize,
      orderByDirection,
      orderByColumn,
      this.sharedVariableService.getSelectedOrganisationId()
    );
  }

  public clickDelete(deviceModel) {
    this.deleteDialogSubscription = this.deleteDialogservice
      .showSimpleDialog()
      .subscribe((response) => {
        if (response) {
          this.deviceModelService
            .delete(deviceModel.id)
            .subscribe((response) => {
              if (response.ok) {
                this.paginator.page.emit({
                  pageIndex: this.paginator.pageIndex,
                  pageSize: this.paginator.pageSize,
                  length: this.resultsLength,
                });
              } else {
                this.deleteDialogSubscription = this.deleteDialogservice
                  .showSimpleDialog(
                    response.error.message,
                    false,
                    false,
                    true,
                    this.errorTitle
                  )
                  .subscribe();
              }
            });
        } else {
          console.log(response);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
      this.deleteDialogSubscription.unsubscribe();
    }
  }
}
