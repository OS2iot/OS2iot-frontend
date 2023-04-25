import { recordToEntries } from '@shared/helpers/record.helper';

export enum DeviceType {
  GENERIC_HTTP = 'GENERIC_HTTP',
  LORAWAN = 'LORAWAN',
  SIGFOX = 'SIGFOX',
  MQTT = 'MQTT',
  MQTT_BROKER = 'MQTT_BROKER',
  MQTT_CLIENT = 'MQTT_CLIENT',
}

enum ApplicationExtraDeviceType {
  OTHER = 'OTHER',
}

export type ApplicationDeviceTypeUnion =
  | DeviceType
  | ApplicationExtraDeviceType;
// Enums cannot be extended like types
export const ApplicationDeviceTypes = {
  ...DeviceType,
  ...ApplicationExtraDeviceType,
};
export const ApplicationDeviceTypeEntries = recordToEntries(
  ApplicationDeviceTypes
);
