import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Downlink } from "@applications/iot-devices/downlink.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { DeviceType } from "@shared/enums/device-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { DownlinkService } from "@shared/services/downlink.service";
import { DownlinkDialogComponent } from "./downlink-dialog/downlink-dialog.component";

@Component({
    selector: "app-downlink",
    templateUrl: "./downlink.component.html",
    styleUrls: ["./downlink.component.scss"],
})
export class DownlinkComponent implements OnInit {
    @Input() device: IotDevice;
    @Input() errorMessages: string[];
    public downlinkText: string;
    public downlink = new Downlink();

    constructor(
        private snackBar: MatSnackBar,
        private translate: TranslateService,
        private downlinkService: DownlinkService,
        public dialog: MatDialog,
        private errorMessageService: ErrorMessageService
    ) {}

    ngOnInit(): void {
        this.errorMessages = [];
    }

    clickDownlink() {
        if (this.validateHex(this.downlink.data)) {
            this.downlinkService.get(this.device.id).subscribe(
                (response: any) => {
                    if (response.totalCount > 0) {
                        this.openDownlinkDialog();
                    } else {
                        this.startDownlink();
                    }
                },
                error => {
                    this.handleError(error);
                    console.log(error);
                }
            );
        }
    }

    private handleError(error: HttpErrorResponse) {
        if (error?.error?.chirpstackError?.error == "f_port must be > 0") {
            this.errorMessages = ["port must be > 0"];
            return;
        }
        this.errorMessages = this.errorMessageService.handleErrorMessage(error);
    }

    private startDownlink() {
        this.errorMessages = [];
        this.downlinkService.post(this.downlink, this.device.id).subscribe(
            response => {
                this.snackBar.open("Element sat i kø", "Downlink", {
                    duration: 10000,
                });
            },
            error => {
                this.handleError(error);
            }
        );
    }

    private validateHex(input: string): boolean {
        const isHexinput = /^[a-fA-F\d]+$/.test(input);
        let validator = false;
        if (isHexinput) {
            if (this.device.type === "SIGFOX" && input.length != 16) {
                this.addToErrorMessage("IOTDEVICE.DOWNLINK.SIGFOX-PAYLOAD-LENGTH");
            }
            validator = true;
        } else {
            this.device.type === DeviceType.LORAWAN
                ? this.addToErrorMessage("IOTDEVICE.DOWNLINK.NO-PORT-OR-PAYLOAD")
                : this.addToErrorMessage("IOTDEVICE.DOWNLINK.NO-PAYLOAD");
            this.addToErrorMessage("IOTDEVICE.DOWNLINK.FORMAT-ERROR");
            validator = false;
        }
        return validator;
    }

    addToErrorMessage(text: string) {
        this.translate.get([text]).subscribe(translations => {
            this.errorMessages.push(translations[text]);
        });
    }

    getMaxDownloadLength(): number {
        if (this.device.type === DeviceType.SIGFOX) {
            return 16;
        } else {
            return 256;
        }
    }

    openDownlinkDialog() {
        const dialog = this.dialog.open(DownlinkDialogComponent, {});

        dialog.afterClosed().subscribe(result => {
            if (result === true) {
                this.startDownlink();
                console.log(`Dialog result: ${result}`);
            }
        });
    }
}
