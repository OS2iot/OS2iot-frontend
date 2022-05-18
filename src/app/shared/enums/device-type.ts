import { recordToEntries } from '@shared/helpers/record.helper';

export enum DeviceType {
  GENERIC_HTTP = 'GENERIC_HTTP',
  LORAWAN = 'LORAWAN',
  SIGFOX = 'SIGFOX',
}

enum ApplicationExtraDeviceType {
  OTHER = 'OTHER',
}

export type ApplicationDeviceTypeUnion = DeviceType | ApplicationExtraDeviceType;
// Enums cannot be extended like types
export const ApplicationDeviceTypes = {
  ...DeviceType,
  ...ApplicationExtraDeviceType,
};
export const ApplicationDeviceTypeEntries = recordToEntries(
  ApplicationDeviceTypes
);
