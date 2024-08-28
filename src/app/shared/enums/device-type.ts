import { recordToEntries } from "@shared/helpers/record.helper";

export enum DeviceType {
    GENERIC_HTTP = "GENERIC_HTTP",
    LORAWAN = "LORAWAN",
    SIGFOX = "SIGFOX",
    MQTT = "MQTT",
    MQTT_INTERNAL_BROKER = "MQTT_INTERNAL_BROKER",
    MQTT_EXTERNAL_BROKER = "MQTT_EXTERNAL_BROKER",
}

enum ApplicationExtraDeviceType {
    OTHER = "OTHER",
}

export type ApplicationDeviceTypeUnion =
    | Exclude<DeviceType, DeviceType.MQTT_INTERNAL_BROKER | DeviceType.MQTT_EXTERNAL_BROKER>
    | ApplicationExtraDeviceType;

// Enums cannot be extended like types
export const ApplicationDeviceTypes = {
    ...DeviceType,
    ...ApplicationExtraDeviceType,
};
export const ApplicationDeviceTypeEntries = recordToEntries(ApplicationDeviceTypes);
