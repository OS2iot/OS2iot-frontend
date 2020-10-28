import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { Application } from '@applications/application.model';
import { Sort } from '@shared/models/sort.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { IoTDeviceService } from '../iot-device.service';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DeviceType } from '@shared/enums/device-type';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-iot-devices-table',
    templateUrl: './iot-devices-table.component.html',
    styleUrls: ['./iot-devices-table.component.scss'],
})
export class IotDevicesTableComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns: string[] = ['name', 'technology', 'alarm', 'battery', 'active', 'menu'];
    public dataSource = new MatTableDataSource<IotDevice>();
    public iotDevices: IotDevice[];

    batteryStatusColor = 'green';
    batteryStatusPercentage = 50;
    device: IotDevice;
    resultsLength = 0;
    isLoadingResults = true;
    deleteDevice = new EventEmitter();

    @Input() application: Application;
    private applicationSubscription: Subscription;

    constructor(
        private restService: RestService,
        public translate: TranslateService,
        public iotDeviceService: IoTDeviceService,
        private dialog: MatDialog
    ) {
        translate.use('da');
    }

    ngOnInit(): void {
        this.getDevices();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public getBatteryProcentage(device: IotDevice): number {
        const percentage = Math.round((device?.lorawanSettings?.deviceStatusBattery / device?.lorawanSettings?.deviceStatusMargin) * 100);
        return percentage;
    }

    getDevices(): void {
        this.applicationSubscription = this.restService
            .get('application', {}, this.application.id)
            .subscribe((application: Application) => {
                this.iotDevices = application.iotDevices;
                this.dataSource = new MatTableDataSource<IotDevice>(this.iotDevices);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.isLoadingResults = false;
                this.resultsLength = this.iotDevices.length;
            });
    }

    public lastActive(device: IotDevice) {
        const arr = device?.receivedMessagesMetadata;
        if (!arr || arr.length === 0) {
            return this.translate.instant('ACTIVITY.NEVER');
        } else {
            const lastActive = arr[arr.length - 1].sentTime;
            return moment(lastActive).fromNow();
        }
    }

    clickDelete(element: any) {
        if (element.type == DeviceType.SIGFOX) {
            this.showSigfoxDeleteDialog();
          } else {
            this.iotDeviceService.deleteIoTDevice(element.id).subscribe((response) => {
                if (response.ok && response.body.affected > 0) {
                    this.deleteDevice.emit(element.id);
                    this.getDevices();
                }
            });
          }
    }

    showSigfoxDeleteDialog() {
        const dialog = this.dialog.open(DeleteDialogComponent, {
          data: {
            message: 'Sigfox enheder kan ikke slettes fra OS2IoT, de skal slettes fra backend.sigfox.com, hvorefter de automatisk bliver slettet fra OS2IoT inden for få minutter',
            showAccept: false,
            showCancel: true
          }
        });
      }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationSubscription) {
            this.applicationSubscription.unsubscribe();
        }
    }
}
