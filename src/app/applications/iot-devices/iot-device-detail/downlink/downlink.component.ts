import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Downlink } from '@applications/iot-devices/downlink.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageHandler } from '@shared/error-message-handler';
import { DownlinkService } from '@shared/services/downlink.service';

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
  ) { }

  ngOnInit(): void {
  }

  startDownlink() {
    this.errorMessages = [];
    if (this.validateHex(this.downlink.payload)) {
        console.log('start downlink');
        this.downlinkService.post(this.downlink)
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

}
