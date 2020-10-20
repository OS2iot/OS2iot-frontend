import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';
import { Downlink } from '../downlink.model';
import { IotDevice } from '../iot-device.model';
import { IoTDeviceService } from '../iot-device.service';
import { Location } from '@angular/common';


@Component({
    selector: 'app-iot-device',
    templateUrl: './iot-device-detail.component.html',
    styleUrls: ['./iot-device-detail.component.scss'],
})
export class IoTDeviceDetailComponent implements OnInit, OnDestroy {
    public deviceId: number;
    public backButton: BackButton = { label: '', routerLink: '/applications' };
    public application: Application;
    public latitude: number;
    public longitude: number;
    public iotDeviceSubscription: Subscription;
    public deviceProfileSubscription: Subscription;
    public OTAA = true;
    public detailsText: string;
    public downlinkText: string;
    public deviceProfileName: string;
    public serviceProfileName: string;
    public downlink = new Downlink();
    public errorMessages: string[];
    deleteDevice = new EventEmitter();


    // TODO: Få aktivt miljø?
    public baseUrl = environment.baseUrl;
    public genericHttpDeviceUrl: string;

    device = new IotDevice;

    constructor(
        private route: ActivatedRoute,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService,
        private router: Router,
        private location: Location,
    ) { }

    ngOnInit(): void {
        this.deviceId = +this.route.snapshot.paramMap.get('deviceId');

        if (this.deviceId) {
            this.bindIoTDeviceAndApplication(this.deviceId);
        }

        this.translate.get(['NAV.APPLICATIONS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.APPLICATIONS'];
            });
    }

    bindIoTDeviceAndApplication(deviceId: number) {
        this.iotDeviceSubscription = this.iotDeviceService.getIoTDevice(deviceId).subscribe((device: IotDevice) => {
            this.device = device;
            this.application = device.application;

            if (this.device.location) {
                this.longitude = this.device.location.coordinates[0];
                this.latitude = this.device.location.coordinates[1];
            }
        });
    }

    getGenericHttpDeviceUrl(device: IotDevice): string {
        return `${this.baseUrl}receive-data?apiKey=${device.apiKey}`;
    }

    clickDelete() {
        const id = this.device.id;
        this.iotDeviceService.deleteIoTDevice(id).subscribe((response) => {
            if (response.ok && response.body.affected > 0) {
                this.deleteDevice.emit(id);
            }
        });
        this.routeBack();
    }

    routeBack(): void {
        this.location.back();
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.iotDeviceSubscription) {
            this.iotDeviceSubscription.unsubscribe();
        }
    }
}
