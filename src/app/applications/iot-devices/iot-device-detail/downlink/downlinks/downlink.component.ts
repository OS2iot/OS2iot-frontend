import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { DeviceType } from "@shared/enums/device-type";
import { ErrorMessageService } from "@shared/error-message.service";
import { DownlinkService } from "@shared/services/downlink.service";
import { Downlink } from "../downlink.model";
import { DownlinkQueueDto } from "../downlink-queue-dto";

@Component({
  selector: "app-downlink",
  templateUrl: "./downlink.component.html",
  styleUrls: ["./downlink.component.scss"],
  standalone: false,
})
export class DownlinkComponent implements OnInit {
  @Input() device: IotDevice;
  @Input() errorMessages: string[];
  public downlink = new Downlink();
  public downlinkQueue: DownlinkQueueDto[];
  public isLoadingResults = false;

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private downlinkService: DownlinkService,
    public dialog: MatDialog,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.errorMessages = [];
    this.isLoadingResults = true;

    this.getDownlinksQueue();
  }

  getDownlinksQueue() {
    this.downlinkService.getDownlinkQueue(this.device.id).subscribe({
      next: (response: DownlinkQueueDto[]) => {
        this.downlinkQueue = response;
        this.isLoadingResults = false;
      },
      error: error => {
        this.handleError(error);
        console.log(error);
        this.isLoadingResults = false;
      },
    });
  }

  handleQueueDownlink() {
    if (this.validateHex(this.downlink.data)) {
      this.startDownlink();
    }
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

  private handleError(error: HttpErrorResponse) {
    if (error?.error?.chirpstackError?.error == "f_port must be > 0") {
      this.errorMessages = ["port must be > 0"];
      return;
    }
    this.errorMessages = this.errorMessageService.handleErrorMessage(error);
  }

  private startDownlink() {
    this.errorMessages = [];
    this.downlinkService.postDownlink(this.downlink, this.device.id).subscribe({
      next: () => {
        this.snackBar.open("Element sat i kø", "Downlink", {
          duration: 10000,
        });
      },
      error: error => {
        this.handleError(error);
      },
    });
    this.getDownlinksQueue();
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
}
