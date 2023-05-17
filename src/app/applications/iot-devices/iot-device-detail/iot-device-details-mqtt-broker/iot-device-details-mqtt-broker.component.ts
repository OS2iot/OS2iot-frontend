import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { AuthenticationType } from '@shared/enums/authentication-type';
import { simpleDownload } from '@shared/helpers/download.helper';

@Component({
  selector: 'app-iot-device-details-mqtt-broker',
  templateUrl: './iot-device-details-mqtt-broker.component.html',
  styleUrls: ['./iot-device-details-mqtt-broker.component.scss'],
})
export class IotDeviceDetailsMqttBrokerComponent implements OnInit {
  @Input() device: IotDevice;

  constructor() {}

  ngOnInit(): void {}

  protected readonly AuthenticationType = AuthenticationType;

  downloadCaCertificate(caCertificate: string, filename: string) {
    simpleDownload(caCertificate, filename);
  }
}
