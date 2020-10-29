import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['name', 'id', 'menu'];
  public isLoadingResults = false;
  resultsLength = 0;

  constructor() { }

  ngOnInit(): void {
    const dm: DeviceModel = new DeviceModel();
    dm.name = 'Linksys';
    dm.id = 'QWE123';
    this.dataSource = new MatTableDataSource<DeviceModel>([dm]);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.isLoadingResults = false;
    this.resultsLength = 1;
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
