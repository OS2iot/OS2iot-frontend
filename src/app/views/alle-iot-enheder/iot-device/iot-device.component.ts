import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/shared/_services/application.service';
import { IoTDeviceService } from 'src/app/shared/_services/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { Application } from 'src/app/models/application';
import { IotDevice } from '../../../models/iot-device';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-iot-device',
    templateUrl: './iot-device.component.html',
    styleUrls: ['./iot-device.component.scss'],
})
export class IoTDeviceComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private applicationService: ApplicationService,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService
    ) {}

    deviceId: number;

    public application: Application;
    public device: IotDevice;
    latitude: number;
    longitude: number;

    // TODO: Få aktivt miljø?
    baseUrl = environment.baseUrl;
    genericHttpDeviceUrl: string;

    ngOnInit(): void {
        this.deviceId = +this.route.snapshot.paramMap.get('deviceId');

        if (this.deviceId) {
            this.bindIoTDeviceAndApplication(this.deviceId);
        }
    }

    bindIoTDeviceAndApplication(deviceId: number) {
        this.iotDeviceService.getIoTDevice(deviceId).subscribe((device) => {
            this.device = device;
            this.application = device.application;
            console.log(JSON.stringify(this.device));
            console.log(JSON.stringify(this.application));

            if (this.device.location) {
                this.latitude = this.device.location.coordinates[0];
                this.longitude = this.device.location.coordinates[1];
            }
        });
    }

    getGenericHttpDeviceUrl(device: IotDevice): string {
        return `${this.baseUrl}receive-data?apiKey=${device.apiKey}`;
    }
}
