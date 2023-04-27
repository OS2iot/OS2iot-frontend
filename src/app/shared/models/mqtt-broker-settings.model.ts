import { AuthenticationType } from '@shared/enums/authentication-type';

export class MqttBrokerSettings {
  authenticationType: AuthenticationType;
  certificate: string;
  mqttUsername: string;
  mqttPassword: string;
  mqttURL: string;
  mqttTopicName: string;
}
