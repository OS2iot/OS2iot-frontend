import { MqttSharedSettings } from '@shared/models/mqtt-shared-settings.model';

export class MqttSubscriberSettings extends MqttSharedSettings {
  invalidMqttConfig: boolean;
}
