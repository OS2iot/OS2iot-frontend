import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';
import { DeleteDialogService } from '@shared/components/delete-dialog/delete-dialog.service';
import { DeviceType } from '@shared/enums/device-type';
import { BackButton } from '@shared/models/back-button.model';
import { Subscription } from 'rxjs';
import { Downlink } from '../downlink.model';
import { IotDevice } from '../iot-device.model';
import { IoTDeviceService } from '../iot-device.service';
import { DropdownButton } from '@shared/models/dropdown-button.model';

@Component({
    selector: 'app-iot-device',
    templateUrl: './iot-device-detail.component.html',
    styleUrls: ['./iot-device-detail.component.scss'],
})
export class IoTDeviceDetailComponent implements OnInit, OnDestroy {
    device: IotDevice;
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
    private deleteDialogSubscription: Subscription;
    public dropdownButton: DropdownButton;

    // TODO: Få aktivt miljø?
    public baseUrl = environment.baseUrl;
    public genericHttpDeviceUrl: string;


    constructor(
        private route: ActivatedRoute,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService,
        private router: Router,
        private deleteDialogService: DeleteDialogService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {

        this.deviceId = +this.route.snapshot.paramMap.get('deviceId');

        if (this.deviceId) {
            this.bindIoTDeviceAndApplication(this.deviceId);
            this.dropdownButton = {
                label: '',
                editRouterLink: '../../iot-device-edit/' + this.deviceId,
                isErasable: true,
            };
        }

        this.translate.get(['NAV.APPLICATIONS', 'IOTDEVICE-TABLE-ROW.SHOW-OPTIONS'])
            .subscribe(translations => {
                this.backButton.label = translations['NAV.APPLICATIONS'];
                this.dropdownButton.label = translations['IOTDEVICE-TABLE-ROW.SHOW-OPTIONS'];
            });
    }

    bindIoTDeviceAndApplication(deviceId: number) {
        this.iotDeviceSubscription = this.iotDeviceService.getIoTDevice(deviceId).subscribe((device: IotDevice) => {
            this.device = device;
            this.application = device.application;
            this.setBackButton(device.application.id.toString());
            if (this.device.location) {
                this.longitude = this.device.location.coordinates[0];
                this.latitude = this.device.location.coordinates[1];
            }
        });
    }

    private setBackButton(applicaitonId: string) {
        this.backButton.routerLink = ['applications', applicaitonId];
    }

    getGenericHttpDeviceUrl(device: IotDevice): string {
        return `${this.baseUrl}receive-data?apiKey=${device.apiKey}`;
    }

    showSigfoxDeleteDialog() {
        const dialog = this.dialog.open(DeleteDialogComponent, {
            data: {
                message: 'Sigfox enheder kan ikke slettes fra OS2IoT, de skal slettes fra backend.sigfox.com, hvorefter de automatisk bliver slettet fra OS2IoT inden for få minutter',
                showAccept: false,
                showCancel: true
            }
        });
    }

    routeToApplication(): void {
        this.router.navigate(['applications', this.application.id]);
    }

    clickDelete() {
        if (this.device.type === DeviceType.SIGFOX) {
            this.showSigfoxDeleteDialog();
        } else {
            this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(
                (response) => {
                    if (response) {
                        this.iotDeviceService.deleteIoTDevice(this.device.id).subscribe(
                            (response) => {
                                this.routeToApplication();
                            }
                        );
                    } else {
                        console.log(response);
                    }
                }
            );
        }
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        if (this.iotDeviceSubscription) {
            this.iotDeviceSubscription.unsubscribe();
        }
        if (this.deleteDialogSubscription) {
            this.deleteDialogSubscription.unsubscribe();
        }
    }
}
