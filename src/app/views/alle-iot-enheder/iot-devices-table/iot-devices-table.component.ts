import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { RestService } from 'src/app/shared/_services/rest.service';

import { IotDevice } from 'src/app/models/iot-device';
import { Sort } from 'src/app/models/sort';

@Component({
    selector: 'app-iot-devices-table',
    templateUrl: './iot-devices-table.component.html',
    styleUrls: ['./iot-devices-table.component.scss'],
})
export class IotDevicesTableComponent implements OnInit, OnChanges, OnDestroy {
    @Input() pageLimit: number;
    @Input() selectedSortObject: Sort;
    @Input() applicationDevices?: Observable<IotDevice[]>;
    private iotDeviceSubscription: Subscription;
    public iotDevices: Observable<IotDevice[]>;
    public pageOffset: number = 0;
    public pageTotal: number;

    constructor(
        private restService: RestService,
        public translate: TranslateService
    ) {
        translate.use('da');
    }

    ngOnInit(): void {}

    ngOnChanges() {
        console.log('pageLimit', this.pageLimit);
        console.log('selectedSortId', this.selectedSortObject);
        !this.applicationDevices
            ? this.getDevices()
            : (this.iotDevices = this.applicationDevices);
    }

    getDevices(): void {
        this.iotDeviceSubscription = this.restService
            .get('iot-device', {
                limit: this.pageLimit,
                offset: this.pageOffset,
                sort: this.selectedSortObject.dir,
                orderOn: this.selectedSortObject.col,
            })
            .subscribe((applications) => {
                this.iotDevices = applications.data;
                if (this.pageLimit) {
                    this.pageTotal = Math.ceil(
                        applications.count / this.pageLimit
                    );
                }
            });
    }

    deleteDevice(id: number) {
        this.restService.delete('iot-device', id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.getDevices();
            }
        });
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
        if (this.iotDeviceSubscription) {
            this.iotDeviceSubscription.unsubscribe();
        }
    }
}
