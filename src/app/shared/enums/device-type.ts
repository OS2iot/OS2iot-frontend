import { recordToEntries } from '@shared/helpers/record.helper';

export enum DeviceType {
  GENERIC_HTTP = 'GENERIC_HTTP',
  LORAWAN = 'LORAWAN',
  SIGFOX = 'SIGFOX',
  MQTT = 'MQTT',
  MQTT_BROKER = 'MQTT_BROKER',
  MQTT_SUBSCRIBER = 'MQTT_SUBSCRIBER',
}

enum ApplicationExtraDeviceType {
  OTHER = 'OTHER',
}

export type ApplicationDeviceTypeUnion =
  | Exclude<DeviceType, DeviceType.MQTT_BROKER | DeviceType.MQTT_SUBSCRIBER>
  | ApplicationExtraDeviceType;

// Enums cannot be extended like types
export const ApplicationDeviceTypes = {
  ...DeviceType,
  ...ApplicationExtraDeviceType,
};
export const ApplicationDeviceTypeEntries = recordToEntries(
  ApplicationDeviceTypes
);
