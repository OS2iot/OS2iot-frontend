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
        private router: Router,
    ) {
        translate.use('da');
    }

    ngOnInit(): void {
        this.batteryStatusPercentage = this.getBatteryProcentage();
        this.getDevices();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    }

    getBatteryProcentage(): number {
        const percentage = Math.round((this.device?.lorawanSettings?.deviceStatusBattery / this.device?.lorawanSettings?.deviceStatusMargin) * 100);
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

    lastActive() {
        const arr = this.device?.receivedMessagesMetadata;
        if (!arr || arr.length === 0) {
            return this.translate.instant('ACTIVITY.NEVER');
        } else {
            const lastActive = arr[arr.length - 1].sentTime;
            return moment(lastActive).fromNow();
        }
    }

    clickDelete() {
        const id = this.device.id;
        this.iotDeviceService.deleteIoTDevice(id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.deleteDevice.emit(id);
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
