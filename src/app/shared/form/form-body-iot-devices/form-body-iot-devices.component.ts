import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Application } from 'src/app/models/application';
import { IotDevice } from 'src/app/models/iot-device';
import { Subscription } from 'rxjs';
import { IoTDeviceService } from '../../_services/iot-device.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from '../../_services/application.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-form-body-iot-devices',
    templateUrl: './form-body-iot-devices.component.html',
    styleUrls: ['./form-body-iot-devices.component.scss'],
})
export class FormBodyIotDevicesComponent implements OnInit, OnDestroy {
    @Input() submitButton: string;
    @Input() application: Application;
    public form: FormGroup;
    public payLoad = '';
    public deviceSubscription: Subscription;
    public errorMessages: any;
    public errorFields: string[];
    public formFailedSubmit: boolean = false;
    public applications: Application[];
    private id: number;
    public disableChoseApplication: boolean = true;

    private applicationsSubscription: Subscription;

    iotDevice = new IotDevice();

    constructor(
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private applicationService: ApplicationService,
        private iotDeviceService: IoTDeviceService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.translate.use('da');
        this.iotDevice.applicationId = +this.route.snapshot.paramMap.get('id');
        this.id = +this.route.snapshot.paramMap.get('deviceId');

        if (this.iotDevice.applicationId && this.id) {
            this.getDevice(this.id);
            this.disableChoseApplication = false;
        }

        this.getApplications();
    }

    getApplications(): void {
        this.applicationsSubscription = this.applicationService
            .getApplications(0, 0, 'ASC', 'name')
            .subscribe((applications) => {
                this.applications = applications.data;
            });
    }

    getDevice(id: number): void {
        this.deviceSubscription = this.iotDeviceService
            .getIoTDevice(id)
            .subscribe((device: IotDevice) => {
                this.iotDevice = device;
                if (this.iotDevice?.application?.id) {
                    this.iotDevice.applicationId = device.application?.id
                }
                if (device.location) {
                    this.iotDevice.longitude = device.location.coordinates[0];
                    this.iotDevice.latitude = device.location.coordinates[1];
                }
            });
    }

    onSubmit(): void {
        if (this.id) {
            this.updateIoTDevice(this.id);
        } else {
            this.postIoTDevice();
        }
    }

    postIoTDevice() {
        this.iotDeviceService.createIoTDevice(this.iotDevice).subscribe(
            () => {
                this.router.navigate([
                    'mine-applikationer/application',
                    this.iotDevice.applicationId,
                ]);
            },
            (error: HttpErrorResponse) => {
                this.errorFields = [];
                this.errorMessages = [];
                error.error.message.forEach((err) => {
                    this.errorFields.push(err.property);
                    this.errorMessages = this.errorMessages.concat(
                        Object.values(err.constraints)
                    );
                });
                this.formFailedSubmit = true;
            }
        );
    }

    updateIoTDevice(id: number) {
        this.iotDevice.applicationId = Number(this.iotDevice.applicationId)
        this.iotDeviceService.updateIoTDevice(this.iotDevice, id).subscribe(
            () => {
                this.routeBack()
            },
            (error: HttpErrorResponse) => {
                this.errorFields = [];
                this.errorMessages = [];
                error.error.message.forEach((err) => {
                    this.errorFields.push(err.property);
                    this.errorMessages = this.errorMessages.concat(
                        Object.values(err.constraints)
                    );
                });
                this.formFailedSubmit = true;
            }
        );
    }

    routeBack(): void {
        this.location.back()
    }

    onCoordinateKey(event: any) {
        console.log(event.target.value);
        console.log(event.target.maxLength);
        if (event.target.value.length > event.target.maxLength)
            event.target.value = event.target.value.slice(
                0,
                event.target.maxLength
            );
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
        if (this.deviceSubscription) {
            this.deviceSubscription.unsubscribe();
        }
    }
}
