import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/da';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';


@Component({
  selector: 'tr[app-iot-devices-table-row]',
  templateUrl: './iot-devices-table-row.component.html',
  styleUrls: ['./iot-devices-table-row.component.scss']
})
export class IotDevicesTableRowComponent implements OnInit {
  batteryStatusColor = 'green';
  batteryStatusPercentage = 50;
  @Input() device: IotDevice;

  @Output() deleteDevice = new EventEmitter();

  constructor(
    public iotDeviceService: IoTDeviceService,
    public translate: TranslateService,
    private router: Router
  ) {
    translate.use('da');
    moment.locale('da');
  }

  ngOnInit(): void { }

  clickDelete() {
    const id = this.device.id;
    this.iotDeviceService.deleteIoTDevice(id).subscribe((response) => {
      if (response.ok && response.body.affected > 0) {
        this.deleteDevice.emit(id);
      }
    });
  }

  navigateToEditPage() {
    this.router.navigate(['iot-device-edit', this.device.id]);
  }

  lastActive() {
    const arr = this.device?.receivedMessagesMetadata;
    if (!arr || arr.length == 0) {
      return this.translate.instant("ACTIVITY.NEVER")
    } else {
      const lastActive = arr[arr.length - 1].sentTime;
      return moment(lastActive).fromNow()
    }
  }
}
