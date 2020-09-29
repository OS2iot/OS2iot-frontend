import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Application } from '@applications/application.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { ServiceProfile, ServiceProfileResponseMany } from 'src/app/profiles/service-profiles/service-profile.model';
import { DeviceProfile } from 'src/app/profiles/device-profiles/device-profile.model';
import { ActivationType } from '@shared/enums/activation-type';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { DeviceProfileService } from '@profiles/device-profiles/device-profile.service';
import { ServiceProfileService } from '@profiles/service-profiles/service-profile.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { ApplicationService } from '@applications/application.service';
import { DeviceType } from '@shared/enums/device-type';

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
        private location: Location,
        private shareVariable: SharedVariableService,
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
            .getApplications(0, 0, 'ASC', 'name', this.shareVariable.getSelectedOrganisationId())
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
        this.getDeviceProfile(deviceProfileId);
    }

    getDeviceProfile(deviceProfileId: string) {
        this.deviceProfileSubscription = this.deviceProfileService.getOne(deviceProfileId)
            .subscribe((response) => {
                this.OTAA = response.deviceProfile.supportsJoin;
            });
    }

    getServiceProfiles() {
        this.serviceProfilesSubscription = this.serviceProfileService
            .getMultiple().subscribe((result: ServiceProfileResponseMany) => {
                this.serviceProfiles = result.result;
            });
    }

    getDeviceProfiles() {
        this.devicesProfileSubscription = this.deviceProfileService
            .getMultiple().subscribe((result) => {
                this.deviceProfiles = result.result;
            });
    }

    onSubmit(): void {
        this.adjustModelBasedOnType();
        if (this.id) {
            this.updateIoTDevice(this.id);
        } else {
            this.postIoTDevice();
        }
    }

    setActivationType() {
        if (this.OTAA) {
            this.iotDevice.lorawanSettings.activationType = ActivationType.OTAA;
        } else {
            this.iotDevice.lorawanSettings.activationType = ActivationType.ABP;
        }
    }

    private adjustModelBasedOnType() {
        switch (this.iotDevice.type) {
            case DeviceType.GENERICHTTP: {
                this.iotDevice.lorawanSettings = null;
                break;
            }
            case DeviceType.LORAWAN: {
                this.setActivationType();
                break;
            }
        }
    }

    postIoTDevice() {
        this.iotDeviceService.createIoTDevice(this.iotDevice).subscribe(
            () => {
                this.router.navigate([
                    'applications/',
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
        if (typeof error.error.message === 'string') {
            this.errorMessages.push(error.error.message);
        } else {
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
