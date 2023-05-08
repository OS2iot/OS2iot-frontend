import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { AuthenticationType } from '@shared/enums/authentication-type';

@Component({
  selector: 'app-iot-device-details-mqtt-subscriber',
  templateUrl: './iot-device-details-mqtt-subscriber.component.html',
  styleUrls: ['./iot-device-details-mqtt-subscriber.component.scss'],
})
export class IotDeviceDetailsMqttSubscriberComponent implements OnInit {
  @Input() device: IotDevice;

  constructor() {}

  ngOnInit(): void {}

  protected readonly AuthenticationType = AuthenticationType;
}
