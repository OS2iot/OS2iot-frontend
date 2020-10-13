import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-iot-device-detail-generic',
  templateUrl: './iot-device-detail-generic.component.html',
  styleUrls: ['./iot-device-detail-generic.component.scss']
})
export class IotDeviceDetailGenericComponent implements OnInit {

  @Input() device: IotDevice;
  @Input() latitude: number;
  @Input() longitude: number;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
