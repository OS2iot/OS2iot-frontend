import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "@applications/application.model";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogComponent } from "@shared/components/delete-dialog/delete-dialog.component";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { DeviceType } from "@shared/enums/device-type";
import { BackButton } from "@shared/models/back-button.model";
import { Subscription } from "rxjs";
import { IotDevice } from "../iot-device.model";
import { IoTDeviceService } from "../iot-device.service";
import { DropdownButton, ExtraDropdownOption } from "@shared/models/dropdown-button.model";
import { Title } from "@angular/platform-browser";
import { MeService } from "@shared/services/me.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { IotDeviceDetailsService } from "@applications/iot-devices/iot-device-details-service";

@Component({
    selector: "app-iot-device",
    templateUrl: "./iot-device-detail.component.html",
    styleUrls: ["./iot-device-detail.component.scss"],
})
export class IoTDeviceDetailComponent implements OnInit, OnDestroy {
    public navTabs: any[] = [
        {
            label: "APPLICATION.DETAILS",
            link: "./details",
            index: 0,
        },
        {
            label: "IOTDEVICE.HISTORY",
            link: "./history",
            index: 1,
        },
        {
            label: "IOTDEVICE.DATA-PACKETS",
            link: "./data-packets",
            index: 2,
        },
        {
            label: "IOTDEVICE.DOWNLINK-TAB",
            link: "./downlink",
            index: 3,
        },
    ];
    device: IotDevice;
    public deviceId: number;
    public backButton: BackButton = { label: "", routerLink: "undefined" };
    public application: Application;

    public iotDeviceSubscription: Subscription;
    public errorMessages: string[];
    private deleteDialogSubscription: Subscription;
    public dropdownButton: DropdownButton;
    public canEdit = false;

    private resetApiKeyId = "RESET-API-KEY";
    private resetApiKeyOption: ExtraDropdownOption;
    private resetApiKeyBody: string;
    private resetApiKeyConfirm: string;
    private resetApiKeyCancel: string;

    constructor(
        private route: ActivatedRoute,
        private iotDeviceService: IoTDeviceService,
        private translate: TranslateService,
        private router: Router,
        private deleteDialogService: DeleteDialogService,
        private dialog: MatDialog,
        private titleService: Title,
        private meService: MeService,
        private iotDeviceDetailsService: IotDeviceDetailsService
    ) {}

    ngOnInit(): void {
        this.deviceId = +this.route.snapshot.paramMap.get("deviceId");
        const appId: number = +this.route.snapshot.paramMap.get("id");
        this.canEdit = this.meService.hasAccessToTargetOrganization(
            OrganizationAccessScope.ApplicationWrite,
            undefined,
            appId
        );
        this.backButton.routerLink = `applications/${appId}/iot-devices`;

        if (this.deviceId) {
            this.bindIoTDeviceAndApplication(this.deviceId);
            this.dropdownButton = {
                label: "",
                editRouterLink: "../../iot-device-edit/" + this.deviceId,
                isErasable: true,
            };
        }

        this.translate
            .get([
                "NAV.APPLICATIONS",
                "IOTDEVICE-TABLE-ROW.SHOW-OPTIONS",
                "TITLE.IOTDEVICE",
                "IOTDEVICE-TABLE-ROW.RESET-API-KEY",
                "IOTDEVICE.GENERIC_HTTP.RESET-API-KEY",
                "GEN.CANCEL",
            ])
            .subscribe(translations => {
                this.backButton.label = translations["NAV.APPLICATIONS"];
                this.dropdownButton.label = translations["IOTDEVICE-TABLE-ROW.SHOW-OPTIONS"];
                this.titleService.setTitle(translations["TITLE.IOTDEVICE"]);

                this.resetApiKeyOption = {
                    id: this.resetApiKeyId,
                    label: translations["IOTDEVICE-TABLE-ROW.RESET-API-KEY"],
                };
                this.resetApiKeyBody = translations["IOTDEVICE.GENERIC_HTTP.RESET-API-KEY"]["BODY"];
                this.resetApiKeyConfirm = translations["IOTDEVICE.GENERIC_HTTP.RESET-API-KEY"]["YESRESET"];
                this.resetApiKeyCancel = translations["GEN.CANCEL"];
            });

        this.dropdownButton.extraOptions = [];
        if (this.router.url.split("/").length <= 5) {
            this.router.navigateByUrl(this.router.url + "/details", {
                replaceUrl: true,
            });
        }
    }

    bindIoTDeviceAndApplication(deviceId: number) {
        this.iotDeviceSubscription = this.iotDeviceService.getIoTDevice(deviceId).subscribe((device: IotDevice) => {
            this.device = device;
            this.iotDeviceDetailsService.device = device;
            this.application = device.application;
            if (this.device.location) {
                this.iotDeviceDetailsService.longitude = this.device.location.coordinates[0];
                this.iotDeviceDetailsService.latitude = this.device.location.coordinates[1];
            }

            if (this.canEdit && this.device.type === DeviceType.GENERIC_HTTP) {
                this.dropdownButton.extraOptions.push(this.resetApiKeyOption);
            }
        });
    }

    showSigfoxDeleteDialog() {
        const dialog = this.dialog.open(DeleteDialogComponent, {
            data: {
                message:
                    "Sigfox enheder kan ikke slettes fra OS2IoT, de skal slettes fra backend.sigfox.com, hvorefter de automatisk bliver slettet fra OS2IoT inden for få minutter",
                showAccept: false,
                showCancel: true,
            },
        });
    }

    routeToApplication(): void {
        this.router.navigate(["applications", this.application.id, "iot-devices"]);
    }

    clickDelete() {
        if (this.device.type === DeviceType.SIGFOX) {
            this.showSigfoxDeleteDialog();
        } else {
            this.deleteDialogSubscription = this.deleteDialogService.showSimpleDialog().subscribe(response => {
                if (response) {
                    this.iotDeviceService.deleteIoTDevice(this.device.id).subscribe(response => {
                        this.routeToApplication();
                    });
                } else {
                    console.log(response);
                }
            });
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

    clickExtraDropdownOption(id: string) {
        if (id === this.resetApiKeyId) {
            this.deleteDialogService
                .showSimpleDialog(
                    this.resetApiKeyBody,
                    true,
                    true,
                    false,
                    "",
                    false,
                    this.resetApiKeyConfirm,
                    this.resetApiKeyCancel
                )
                .subscribe(isConfirmed => {
                    if (isConfirmed) {
                        this.iotDeviceService.resetHttpDeviceApiKey(this.device.id).subscribe(response => {
                            this.device = {
                                ...this.device,
                                apiKey: response.apiKey,
                            };
                        });
                    }
                });
        }
    }
}
