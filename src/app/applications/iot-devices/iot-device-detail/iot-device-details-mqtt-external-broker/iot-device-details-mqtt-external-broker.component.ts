import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { AuthenticationType } from '@shared/enums/authentication-type';

@Component({
  selector: 'app-iot-device-details-mqtt-external-broker',
  templateUrl: './iot-device-details-mqtt-external-broker.component.html',
  styleUrls: ['./iot-device-details-mqtt-external-broker.component.scss'],
})
export class IotDeviceDetailsMqttExternalBrokerComponent implements OnInit {
  @Input() device: IotDevice;

  constructor() {}

  ngOnInit(): void {}

  protected readonly AuthenticationType = AuthenticationType;
}
