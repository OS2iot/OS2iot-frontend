import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { RestService } from 'src/app/shared/services/rest.service';

import { IotDevice } from 'src/app/my-applications/iot-devices/iot-device.model';
import { Sort } from 'src/app/models/sort';
import { Application } from 'src/app/models/application';

@Component({
    selector: 'app-iot-devices-table',
    templateUrl: './iot-devices-table.component.html',
    styleUrls: ['./iot-devices-table.component.scss'],
})
export class IotDevicesTableComponent implements OnInit, OnChanges, OnDestroy {
    @Input() pageLimit: number;
    @Input() selectedSortObject: Sort;
    @Input() application: Application;
    private applicationSubscription: Subscription;
    public iotDevices: IotDevice[];
    public pageOffset: number = 0;
    public pageTotal: number;

    constructor(
        private restService: RestService,
        public translate: TranslateService
    ) {
        translate.use('da');
    }

    ngOnInit(): void { }

    ngOnChanges() {
        this.getDevices();
    }

    getDevices(): void {
        this.applicationSubscription = this.restService
            .get('application', {}, this.application.id)
            .subscribe((application: Application) => {
                this.iotDevices = application.iotDevices;
            });
    }

    deleteDevice(id: number): void {
        this.getDevices();
    }

    prevPage() {
        if (this.pageOffset) this.pageOffset--;
        this.getDevices();
    }

    nextPage() {
        if (this.pageOffset < this.pageTotal) this.pageOffset++;
        this.getDevices();
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationSubscription) {
            this.applicationSubscription.unsubscribe();
        }
    }
}
