import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IotDevice } from 'src/app/models/iot-device';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
  }

  ngOnInit(): void {}

  clickDelete() {
      this.deleteDevice.emit(this.device.id);
  }

  navigateToEditPage() {
      this.router.navigate(['edit-iot-device', this.device.id]);
  }

}
