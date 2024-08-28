import { MqttSharedSettings } from "@shared/models/mqtt-shared-settings.model";

export class MqttExternalBrokerSettings extends MqttSharedSettings {
  invalidMqttConfig: boolean;
}
