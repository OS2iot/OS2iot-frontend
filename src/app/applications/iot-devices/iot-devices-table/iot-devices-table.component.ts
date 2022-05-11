import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  IotDevice,
  IotDevicesResponse,
} from '@applications/iot-devices/iot-device.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { DeviceType } from '@shared/enums/device-type';
import { MeService } from '@shared/services/me.service';
import * as moment from 'moment';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { RestService } from 'src/app/shared/services/rest.service';
import { IoTDeviceService } from '../iot-device.service';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';

@Component({
  selector: 'app-iot-devices-table',
  templateUrl: './iot-devices-table.component.html',
  styleUrls: ['./iot-devices-table.component.scss'],
})
export class IotDevicesTableComponent implements AfterViewInit, OnInit {
  @Input() applicationId: number;
  data: IotDevice[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public pageSize = environment.tablePageSize;
  displayedColumns: string[] = [
    'name',
    'technology',
    'battery',
    'rssi',
    'snr',
    'active',
    'menu',
  ];
  public canEdit = false;

  private readonly CHIRPSTACK_BATTERY_NOT_AVAILIBLE = 255;

  batteryStatusColor = 'green';
  batteryStatusPercentage = 50;
  resultsLength = 0;
  isLoadingResults = true;

  constructor(
    private restService: RestService,
    private deleteDialogService: DeleteDialogService,
    public translate: TranslateService,
    public iotDeviceService: IoTDeviceService,
    private meService: MeService,
    private dialog: MatDialog
  ) {
    translate.use('da');
    moment.locale('da');
  }

  ngOnInit() {
    this.canEdit = this.meService.hasAccessToTargetOrganization(OrganizationAccessScope.ApplicationWrite);
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getDevices(this.sort.active, this.sort.direction);
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

  public getBatteryProcentage(device: IotDevice): number {
    if (
      device?.lorawanSettings?.deviceStatusBattery ===
      this.CHIRPSTACK_BATTERY_NOT_AVAILIBLE
    ) {
      return null;
    }
    return Math.round(device?.lorawanSettings?.deviceStatusBattery);
  }

  getDevices(
    orderByColumn: string,
    orderByDirection: string
  ): Observable<IotDevicesResponse> {
    return this.restService.get(
      `application/${this.applicationId}/iot-devices`,
      {
        limit: this.paginator.pageSize,
        offset: this.paginator.pageIndex * this.paginator.pageSize,
        sort: orderByDirection,
        orderOn: orderByColumn,
      }
    );
  }

  public lastActive(device: IotDevice) {
    return device.latestReceivedMessage
      ? moment(device.latestReceivedMessage.sentTime).fromNow()
      : this.translate.instant('ACTIVITY.NEVER');
  }

  clickDelete(element: any) {
    if (element.type === DeviceType.SIGFOX) {
      this.showSigfoxDeleteDialog();
    } else {
      this.deleteDialogService.showSimpleDialog().subscribe((response) => {
        if (response) {
          this.iotDeviceService
            .deleteIoTDevice(element.id)
            .subscribe((response) => {
              if (response.ok && response.body.affected > 0) {
                this.paginator.page.emit({
                  pageIndex: this.paginator.pageIndex,
                  pageSize: this.paginator.pageSize,
                  length: this.resultsLength,
                });
              }
            });
        } else {
          console.log(response);
        }
      });
    }
  }

  showSigfoxDeleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        message:
          'Sigfox enheder kan ikke slettes fra OS2IoT, de skal slettes fra backend.sigfox.com, hvorefter de automatisk bliver slettet fra OS2IoT inden for få minutter',
        showAccept: false,
        showCancel: true,
      },
    });
  }
}
