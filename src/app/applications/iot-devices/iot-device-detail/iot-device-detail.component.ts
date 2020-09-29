import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '@applications/application.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeviceProfileService } from '@profiles/device-profiles/device-profile.service';
import { ServiceProfileResponseOne } from '@profiles/service-profiles/service-profile.model';
import { ServiceProfileService } from '@profiles/service-profiles/service-profile.service';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';
import { IotDevice } from '../iot-device.model';
import { IoTDeviceService } from '../iot-device.service';


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
    public deviceProfileName: string;
    public serviceProfileName: string;

    // TODO: Få aktivt miljø?
    public baseUrl = environment.baseUrl;
    public genericHttpDeviceUrl: string;

    device = new IotDevice;

    constructor(
        private route: ActivatedRoute,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService,
        private deviceProfileService: DeviceProfileService,
        private serviceProfileService: ServiceProfileService
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

            if (this.device?.lorawanSettings?.deviceProfileID) {
                this.deviceProfileSubscription = this.deviceProfileService.getOne(this.device.lorawanSettings.deviceProfileID)
                    .subscribe((response) => {
                        this.OTAA = response.deviceProfile.supportsJoin;
                        this.deviceProfileName = response.deviceProfile.name;
                    });
            }

            if (this.device?.lorawanSettings?.serviceProfileID) {
                this.deviceProfileSubscription = this.serviceProfileService.getOne(this.device.lorawanSettings.serviceProfileID)
                    .subscribe((response: ServiceProfileResponseOne) => {
                        this.serviceProfileName = response.serviceProfile.name;
                    });
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
