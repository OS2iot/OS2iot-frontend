import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Downlink } from '@applications/iot-devices/downlink.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageHandler } from '@shared/error-message-handler';
import { DownlinkService } from '@shared/services/downlink.service';
import { DownlinkDialogComponent } from './downlink-dialog/downlink-dialog.component';

@Component({
  selector: 'app-downlink',
  templateUrl: './downlink.component.html',
  styleUrls: ['./downlink.component.scss']
})
export class DownlinkComponent implements OnInit {

  @Input() device: IotDevice;
  @Input() errorMessages: string[];
  public downlinkText: string;
  public downlink = new Downlink();
  private errorMessageHandler = new ErrorMessageHandler();

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private downlinkService: DownlinkService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  clickDownlink() {
    // add call to backend when developed. Check if a downlink already excist
    if (true) {
        this.openDownlinkDialog();
    } else {
        this.startDownlink();
    }
  }

  startDownlink() {
    this.errorMessages = [];
    if (this.validateHex(this.downlink.data)) {
        console.log('start downlink');
        this.downlinkService.post(this.downlink, this.device.id)
            .subscribe(
                (response) => {
                    this.snackBar.open('Element sat i kø', 'Downlink', {
                        duration: 10000
                    });
                },
                (error) => {
                    const errorMessages: string[] = this.errorMessageHandler.handleErrorMessage(error);
                    this.snackBar.open('Fejl:' + errorMessages);
                });
    } else {
        console.log('fejl i format');
    }
  }

  validateHex(input: string): boolean {
      const res = parseInt(input, 16);
      if (res) {
          if (this.device.type === 'SIGFOX' && input.length > 16) {
              this.translate.get(['IOTDEVICE.DOWNLINK.ERROR-SIGFOX-LENGTH'])
                  .subscribe(translations => {
                  this.errorMessages.push(translations['IOTDEVICE.DOWNLINK.ERROR-SIGFOX-LENGTH']);
              });
              return false;
          }
          return true;
      } else {
          this.translate.get(['IOTDEVICE.DOWNLINK.ERROR-FORMAT'])
                  .subscribe(translations => {
                  this.errorMessages.push(translations['IOTDEVICE.DOWNLINK.ERROR-FORMAT']);
              });
          return false;
      }
  }

  openDownlinkDialog() {
    const dialog = this.dialog.open(DownlinkDialogComponent, {
    });

    dialog.afterClosed().subscribe(result => {
        if (result === true) {
            this.startDownlink();
            console.log(`Dialog result: ${result}`);
        }
      });
  }

}
