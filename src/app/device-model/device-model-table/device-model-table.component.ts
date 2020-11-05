import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { DeviceModelService } from '../device-model.service';
import { DeviceModel } from '../device.model';

@Component({
  selector: 'app-device-model-table',
  templateUrl: './device-model-table.component.html',
  styleUrls: ['./device-model-table.component.scss']
})
export class DeviceModelTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource = new MatTableDataSource<DeviceModel>();
  public deviceModels: DeviceModel[];
  public displayedColumns: string[] = ['name', 'id', 'menu'];
  public isLoadingResults = false;
  public resultsLength = 0;
  public hasWritePermission = false;
  private deviceModelId: number;

  constructor(
    private sharedService: SharedVariableService,
    private deviceModelService: DeviceModelService
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

  clickDelete(element: any) {
    /* this.chirpstackGatewayService.delete(element.id).subscribe((response) => {
      if (response.ok && response.body.success === true) {
        this.deleteGateway.emit(element.id);
        this.getLoraGateways();
      }
    }); */
  }
}
