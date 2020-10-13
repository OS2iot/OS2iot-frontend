import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Downlink } from '@applications/iot-devices/downlink.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  startDownlink() {
    this.errorMessages = [];
    if (this.isValidHex(this.downlink.payload)) {
        console.log('start downlink');
        this.snackBar.open('Element sat i kø', 'Downlink', {
            duration: 10000
        });
    } else {
        console.log('fejl i format');
    }
  }

  isValidHex(input: string): boolean {
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
