import { Component, Input, OnInit } from '@angular/core';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { TranslateService } from '@ngx-translate/core';
import { DeviceType } from '@shared/enums/device-type';
import { AuthenticationType } from '@shared/enums/authentication-type';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mqtt-device-edit',
  templateUrl: './mqtt-device-edit.component.html',
  styleUrls: ['./mqtt-device-edit.component.scss'],
})
export class MqttDeviceEditComponent implements OnInit {
  @Input() iotDevice: IotDevice;
  @Input() formFailedSubmit: boolean = false;
  @Input() errorFields: string[];
  @Input() editMode: boolean = false;
  public mqttDeviceTypes = [DeviceType.MQTT_BROKER, DeviceType.MQTT_SUBSCRIBER];

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.use('da');
    if (this.iotDevice?.id) {
      this.editMode = true;
    }
  }

  protected readonly DeviceType = DeviceType;
  protected readonly AuthenticationType = AuthenticationType;
  protected readonly faQuestionCircle = faQuestionCircle;
}
