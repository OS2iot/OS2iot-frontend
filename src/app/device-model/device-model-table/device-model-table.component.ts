import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Subscription } from 'rxjs';
import { DeviceModelService } from '../device-model.service';
import { DeviceModel } from '../device.model';

@Component({
  selector: 'app-device-model-table',
  templateUrl: './device-model-table.component.html',
  styleUrls: ['./device-model-table.component.scss']
})
export class DeviceModelTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<DeviceModel>();
  public deviceModels: DeviceModel[];
  public displayedColumns: string[] = ['name', 'id', 'menu'];
  public isLoadingResults = false;
  public resultsLength = 0;
  public hasWritePermission = false;
  deleteDialogSubscription: Subscription;

  constructor(
    private sharedService: SharedVariableService,
    private deviceModelService: DeviceModelService,
    private deleteDialogservice: DeleteDialogService
  ) { }

  ngOnInit(): void {
    this.getDeviceModels();
    this.hasWritePermission = this.sharedService.getHasWritePermission();
  }

  getDeviceModels() {
    this.deviceModelService.getMultiple()
      .subscribe( (response) => {
        this.deviceModels = response;
        this.setupMatTable(this.deviceModels);
      },
      (error) => {
        console.log(error);
      });
  }

  setupMatTable(rows: DeviceModel[]) {
    this.dataSource = new MatTableDataSource<DeviceModel>(rows);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.isLoadingResults = false;
    this.resultsLength = rows.length;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public clickDelete(deviceModel) {
    this.deleteDialogSubscription = this.deleteDialogservice.showSimpleDeleteDialog()
      .subscribe(
        (response) => {
          if (response) {
            this.deviceModelService.delete(deviceModel.id)
              .subscribe(
                (response) => {
                  this.getDeviceModels();
                }
              );
          } else {
            console.log(response);
          }
        }
      );
  }

  ngOnDestroy(): void {
    if (this.deleteDialogSubscription) {
        this.deleteDialogSubscription.unsubscribe();
    }
  }
}
