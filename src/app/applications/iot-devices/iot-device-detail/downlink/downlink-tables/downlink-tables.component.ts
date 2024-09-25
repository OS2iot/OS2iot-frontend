import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { ErrorMessageService } from "@shared/error-message.service";
import { DownlinkService } from "@shared/services/downlink.service";
import { DownlinkDialogComponent } from "../downlink-dialog/downlink-dialog.component";
import { DownlinkQueueDto } from "../downlink-queue-dto";

@Component({
  selector: "app-downlink-tables",
  templateUrl: "./downlink-tables.component.html",
  styleUrls: ["./downlink-tables.component.scss"],
})
export class DownlinkTablesComponent implements OnInit {
  @Input() device: IotDevice;
  @Input() errorMessages: string[];
  @Input() downlinkQueue: DownlinkQueueDto[];
  public downlinkHistoryQueue: DownlinkQueueDto[];
  public isLoadingResults = false;
  public displayedColumns: string[] = ["createdAt", "status", "payload", "port"];
  public displayedColumnsHistory: string[] = [
    "createdAt",
    "sendAt",
    "acknowledgedAt",
    "status",
    "fCntDown",
    "acknowledged",
    "payload",
    "port",
  ];

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private downlinkService: DownlinkService,
    public dialog: MatDialog,
    private errorMessageService: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.errorMessages = [];

    this.getDownlinksQueue();
    this.getHistoricalDownlinksQueue();
  }

  getDownlinksQueue() {
    this.isLoadingResults = true;
    this.downlinkService.getDownlinkQueue(this.device.id).subscribe(
      (response: DownlinkQueueDto[]) => {
        this.downlinkQueue = response;
        this.isLoadingResults = false;
      },
      error => {
        this.handleError(error);
        this.isLoadingResults = false;
      }
    );
  }

  getHistoricalDownlinksQueue() {
    this.isLoadingResults = true;
    this.downlinkService.getHistoricalDownlinkQueue(this.device.id).subscribe(
      (response: DownlinkQueueDto[]) => {
        this.downlinkHistoryQueue = response;
        this.isLoadingResults = false;
      },
      error => {
        this.handleError(error);
        this.isLoadingResults = false;
      }
    );
  }

  handleReload() {
    this.getDownlinksQueue();
    this.getHistoricalDownlinksQueue();
  }

  handleFlushQueue() {
    this.openDownlinkDialog();
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMessages = this.errorMessageService.handleErrorMessage(error);
  }

  openDownlinkDialog() {
    const dialog = this.dialog.open(DownlinkDialogComponent, {
      width: "300px",
      height: "200px",
    });

    dialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.downlinkService.flushQueue(this.device.id).subscribe(
          response => {
            this.snackBar.open(
              this.translate.instant("IOTDEVICE.DOWNLINK.QUEUE-FLUSHED"),
              this.translate.instant("DIALOG.OK"),
              {
                duration: 10000,
              }
            );
            this.getDownlinksQueue();
          },
          error => {
            this.handleError(error);
          }
        );
      }
    });
  }

  getStatus(downlink: DownlinkQueueDto) {
    if (!downlink.acknowledgedAt && !downlink.sendAt) {
      return this.translate.instant("IOTDEVICE.DOWNLINK.IN-QUEUE");
    }
    if (downlink.acknowledgedAt) {
      return this.translate.instant("IOTDEVICE.DOWNLINK.RECEIVEDAT");
    }

    return this.translate.instant("IOTDEVICE.DOWNLINK.SENDAT");
  }

  isAcknowledged(downlink: DownlinkQueueDto) {
    return !downlink.acknowledged ? this.translate.instant("false") : this.translate.instant("true");
  }
}
