import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { Application } from 'src/app/models/application';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ApplicationService } from '../../services/application.service';
import { DeviceType } from '../../enums/device-type';
import { IotDevice } from 'src/app/my-applications/iot-devices/iot-device.model';
import { IoTDeviceService } from 'src/app/my-applications/iot-devices/iot-device.service';
import { ServiceProfile, ServiceProfileResponseMany } from 'src/app/profiles/service-profiles/service-profile.model';
import { ServiceProfileService } from '../../services/service-profile.service';
import { DeviceProfile } from 'src/app/profiles/device-profiles/device-profile.model';
import { DeviceProfileService } from '../../services/device-profile.service';

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
    public errorMessages: any;
    public errorFields: string[];
    public formFailedSubmit = false;
    public applications: Application[];
    private id: number;
    public disableChoseApplication = true;
    public loraDevice = DeviceType.LORAWAN;
    public serviceProfiles: ServiceProfile[];
    public deviceProfiles: DeviceProfile[];
    iotDevice = new IotDevice();
    editmode = false;
    public OTAA = true;

    public deviceSubscription: Subscription;
    private applicationsSubscription: Subscription;
    private serviceProfilesSubscription: Subscription;
    private deviceProfileSubscription: Subscription;
    private devicesProfileSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        public translate: TranslateService,
        private router: Router,
        private serviceProfileService: ServiceProfileService,
        private deviceProfileService: DeviceProfileService,
        private applicationService: ApplicationService,
        private iotDeviceService: IoTDeviceService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.translate.use('da');
        this.iotDevice.applicationId = +this.route.snapshot.paramMap.get('id');
        this.id = +this.route.snapshot.paramMap.get('deviceId');

        if (this.iotDevice.applicationId && this.id) {
            this.editmode = true;
            this.getDevice(this.id);
            this.disableChoseApplication = false;
        }

        this.getApplications();
        this.getServiceProfiles();
        this.getDeviceProfiles();
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
                    this.iotDevice.applicationId = device.application?.id;
                }
            if (device.location) {
                    this.iotDevice.longitude = device.location.coordinates[0];
                    this.iotDevice.latitude = device.location.coordinates[1];
                }
            this.OTAA = this.iotDevice.lorawanSettings?.OTAAapplicationKey ? true : false;
            });
    }

    onChangeDeviceProfile(deviceProfileId: string) {
        this.deviceProfileSubscription = this.deviceProfileService.getOne(deviceProfileId)
            .subscribe((response) => {
                this.OTAA = response.deviceProfile.supportsJoin;
            });
    }

    getServiceProfiles() {
        this.serviceProfilesSubscription = this.serviceProfileService
            .getMultiple().subscribe( (result: ServiceProfileResponseMany) => {
                this.serviceProfiles = result.result;
            });
    }

    getDeviceProfiles() {
        this.devicesProfileSubscription = this.deviceProfileService
            .getMultiple().subscribe( (result) => {
                this.deviceProfiles = result.result;
            });
    }

    onSubmit(): void {
        this.cleanModelBasedOnType();
        if (this.id) {
            this.updateIoTDevice(this.id);
        } else {
            this.postIoTDevice();
        }
    }

    private cleanModelBasedOnType() {
        switch (this.iotDevice.type) {
            case DeviceType.GENERICHTTP: {
                this.iotDevice.lorawanSettings = null;
            }
        }
    }

    postIoTDevice() {
        this.iotDeviceService.createIoTDevice(this.iotDevice).subscribe(
            () => {
                this.router.navigate([
                    'my-applications/',
                    this.iotDevice.applicationId,
                ]);
            },
            (error: HttpErrorResponse) => {
                this.handleError(error);
                this.formFailedSubmit = true;
            }
        );
    }

    updateIoTDevice(id: number) {
        this.iotDevice.applicationId = Number(this.iotDevice.applicationId);
        this.iotDeviceService.updateIoTDevice(this.iotDevice, id).subscribe(
            () => {
                this.routeBack();
            },
            (error: HttpErrorResponse) => {
                this.handleError(error);
                this.formFailedSubmit = true;
            }
        );
    }

    routeBack(): void {
        this.location.back();
    }

    handleError(error: HttpErrorResponse) {
        this.errorFields = [];
        this.errorMessages = [];
        error.error.message.forEach((err) => {
            if (err.property === 'lorawanSettings') {
                err.children.forEach(element => {
                    this.errorFields.push(element.property);
                    this.errorMessages = this.errorMessages.concat(
                        Object.values(element.constraints)
                    );
                });
            } else {
                this.errorFields.push(err.property);
                this.errorMessages = this.errorMessages.concat(
                Object.values(err.constraints)
            );
            }
        });
    }

    onCoordinateKey(event: any) {
        console.log(event.target.value);
        console.log(event.target.maxLength);
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(
                0,
                event.target.maxLength
            );
        }
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.applicationsSubscription) {
            this.applicationsSubscription.unsubscribe();
        }
        if (this.deviceSubscription) {
            this.deviceSubscription.unsubscribe();
        }
        if (this.deviceProfileSubscription) {
            this.deviceProfileSubscription.unsubscribe();
        }
        if (this.devicesProfileSubscription) {
            this.devicesProfileSubscription.unsubscribe();
        }
        if (this.serviceProfilesSubscription) {
            this.serviceProfilesSubscription.unsubscribe();
        }
    }
}
