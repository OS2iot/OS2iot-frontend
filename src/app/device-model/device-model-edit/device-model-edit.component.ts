import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { BackButton } from "@shared/models/back-button.model";
import { ScrollToTopService } from "@shared/services/scroll-to-top.service";
import { DeviceModelService } from "../device-model.service";
import { DeviceModel } from "../device.model";
import { ControlledPropertyTypes } from "../Enums/controlled-propperty.enum";
import { DeviceCategory } from "../Enums/device-category.enum";
import { DeviceFunction } from "../Enums/device-function.enum";
import { EnergyLimitationClass } from "../Enums/energy-limitation-class.model";
import { SupportedProtocol } from "../Enums/supported-protocol.enum";
import { SupportedUnit } from "../supported-unit.model";

@Component({
    selector: "app-device-model-edit",
    templateUrl: "./device-model-edit.component.html",
    styleUrls: ["./device-model-edit.component.scss"],
})
export class DeviceModelEditComponent implements OnInit {
    public errorMessages: string[];
    public errorFields: string[];
    public deviceModel: DeviceModel = new DeviceModel();
    public backButton: BackButton = { label: "", routerLink: "/device-model" };
    public title = "";
    public formFailedSubmit = false;
    controlledPropperties: ControlledPropertyTypes[] = [];
    categories: DeviceCategory[] = [];
    supportedUnits = new SupportedUnit();
    deviceFunctions: DeviceFunction[] = [];
    energyLimitationClass = new EnergyLimitationClass();
    supportedProtocol: SupportedProtocol[] = [];

    constructor(
        private translate: TranslateService,
        private location: Location,
        private deviceModelService: DeviceModelService,
        private errorMessageService: ErrorMessageService,
        private route: ActivatedRoute,
        private scrollToTopService: ScrollToTopService
    ) {}

    ngOnInit(): void {
        this.translate.get(["NAV.DEVICE-MODEL"]).subscribe(translations => {
            this.backButton.label = translations["NAV.DEVICE-MODEL"];
            this.title = translations["NAV.DEVICE-MODEL"];
        });
        this.mapEnumsToArray();
        const deviceModelId = +this.route.snapshot.paramMap.get("deviceId");
        if (deviceModelId) {
            this.getDeviceModel(deviceModelId);
        }
        this.supportedUnits.units.sort((a, b) => a.name.localeCompare(b.name));
        this.deviceFunctions.sort((a, b) => a.localeCompare(b));
    }

    mapEnumsToArray() {
        this.controlledPropperties = Object.values(ControlledPropertyTypes);
        this.categories = Object.values(DeviceCategory);
        this.deviceFunctions = Object.values(DeviceFunction);
        this.supportedProtocol = Object.values(SupportedProtocol);
    }

    public compare(o1: any, o2: any): boolean {
        return o1 === o2;
    }

    private getDeviceModel(id: number) {
        this.deviceModelService.get(id).subscribe(response => {
            this.deviceModel = response;
        });
    }

    createDeviceModel() {
        this.deviceModelService.create(this.deviceModel).subscribe(
            response => {
                this.routeBack();
            },
            (error: HttpErrorResponse) => {
                this.handleError(error);
            }
        );
    }

    handleError(err: HttpErrorResponse) {
        const errorResponse = this.errorMessageService.handleErrorMessageWithFields(err);
        this.errorMessages = errorResponse.errorMessages;
        this.errorFields = errorResponse.errorFields;
        this.scrollToTopService.scrollToTop();
    }

    updateDeviceModel() {
        this.deviceModelService.update(this.deviceModel, +this.deviceModel.id).subscribe(
            response => {
                this.routeBack();
            },
            (error: HttpErrorResponse) => {
                this.handleError(error);
            }
        );
    }

    onSubmit() {
        this.deviceModel.id ? this.updateDeviceModel() : this.createDeviceModel();
    }

    routeBack(): void {
        this.location.back();
    }
}
