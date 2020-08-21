import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IoTDeviceService } from 'src/app/shared/_services/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application';
import { IotDevice } from '../../../models/iot-device';
import { environment } from 'src/environments/environment';
import { BackButton } from 'src/app/models/back-button';

@Component({
    selector: 'app-iot-device',
    templateUrl: './iot-device.component.html',
    styleUrls: ['./iot-device.component.scss'],
})
export class IoTDeviceComponent implements OnInit, OnDestroy {
    public deviceId: number;
    public backButton: BackButton = {label: '', routerLink: '/mine-applikationer'};
    public application: Application;
    public latitude: number;
    public longitude: number;
    public iotDeviceSubscription: Subscription;
    
    // TODO: Få aktivt miljø?
    public baseUrl = environment.baseUrl;
    public genericHttpDeviceUrl: string;

    device = new IotDevice;

    constructor(
        private route: ActivatedRoute,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.deviceId = +this.route.snapshot.paramMap.get('deviceId');

        if (this.deviceId) {
            this.bindIoTDeviceAndApplication(this.deviceId);
        }

        this.translate.get(['NAV.MY-APPLICATIONS'])
        .subscribe(translations => {
          this.backButton.label = translations['NAV.MY-APPLICATIONS'];
        });
    }

    bindIoTDeviceAndApplication(deviceId: number) {
        this.iotDeviceSubscription = this.iotDeviceService.getIoTDevice(deviceId).subscribe((device: IotDevice) => {
            this.device = device;
            this.application = device.application;

            if (this.device.location) {
                this.latitude = this.device.location.coordinates[0];
                this.longitude = this.device.location.coordinates[1];
            }
        });
    }

    getGenericHttpDeviceUrl(device: IotDevice): string {
        return `${this.baseUrl}receive-data?apiKey=${device.apiKey}`;
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.iotDeviceSubscription) {
            this.iotDeviceSubscription.unsubscribe();
        }
    }
}
