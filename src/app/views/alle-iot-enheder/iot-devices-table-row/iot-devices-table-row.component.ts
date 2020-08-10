import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IotDevice } from 'src/app/models/iot-device';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import 'moment/locale/da';

@Component({
  selector: 'tr[app-iot-devices-table-row]',
  templateUrl: './iot-devices-table-row.component.html',
  styleUrls: ['./iot-devices-table-row.component.scss']
})
export class IotDevicesTableRowComponent implements OnInit {
  @Input() device: IotDevice;

  @Output() deleteDevice = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private router: Router
    ) {
      translate.use('da');
      moment.locale('da')
  }

  ngOnInit(): void {}

  clickDelete() {
      this.deleteDevice.emit(this.device.id);
  }

  navigateToEditPage() {
      this.router.navigate(['edit-iot-device', this.device.id]);
  }

  lastActive() {
    const arr = this.device.receivedMessagesMetadata;
    if (arr.length == 0) {
      return this.translate.instant("ACTIVITY.NEVER")
    } else {
      const lastActive = arr[arr.length - 1].sentTime;
      return moment(lastActive).fromNow()
    }
  }
}
