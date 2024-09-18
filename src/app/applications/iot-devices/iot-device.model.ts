import { DeviceModel } from "@app/device-model/device.model";
import { SigfoxSettings } from "@app/sigfox/sigfox-settings.model";
import { Application } from "@applications/application.model";
import { DeviceType } from "@shared/enums/device-type";
import { JsonLocation } from "@shared/models/Json-location.model";
import { LorawanSettings } from "@shared/models/lorawan-settings.model";
import { ReceivedMessageMetadata } from "@shared/models/received-message-metadata.model";
import { LatestReceivedMessage } from "./latestReceivedMessage.model";
import { MqttInternalBrokerSettings } from "@shared/models/mqtt-broker-settings.model";
import { MqttExternalBrokerSettings } from "@shared/models/mqtt-subscriber-settings.model";

export class IotDevice {
  name: string;
  application?: Application;
  location: JsonLocation;
  commentOnLocation: string;
  comment: string;
  type: DeviceType = DeviceType.LORAWAN;
  receivedMessagesMetadata: ReceivedMessageMetadata[];
  metadata?: string;
  apiKey?: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
  applicationId: number;
  longitude = 11.764445;
  latitude = 55.959443;
  deviceModelId?: number;
  latestReceivedMessage: LatestReceivedMessage;
  lorawanSettings = new LorawanSettings();
  sigfoxSettings = new SigfoxSettings();
  mqttInternalBrokerSettings = new MqttInternalBrokerSettings();
  mqttExternalBrokerSettings = new MqttExternalBrokerSettings();
  deviceModel?: DeviceModel;
}

export class IotDeviceResponse extends IotDevice {}

export interface IotDevicesResponse {
  data: IotDevice[];
  ok?: boolean;
  count?: number;
}

export interface IotDevicesApplicationMapResponse {
  id: number;
  name: string;
  type: DeviceType;
  latestSentMessage: Date;
  location: JsonLocation;
}

export interface IotDeviceImportRequest {
  data: IotDevice[];
}

export interface IotDevicesImportResponse {
  data: IotDevice;
  idMetadata: {
    name: string;
    applicationId: number;
  };
  error?: Omit<Error, "name">;
}

export class IoTDeviceMinimal {
  id: number;
  name: string;
  canRead: boolean;
  organizationId: number;
  applicationId: number;
  lastActiveTime: Date;
}

export class IoTDevicesMinimalResponse {
  data: IoTDeviceMinimal[];
  count: number;
}

export class IoTDeviceStatsResponse {
  timestamp: string;
  rssi: number;
  snr: number;
  rxPacketsPerDr?: Record<number, number>;
}

export class UpdateIoTDeviceApplication {
  public deviceModelId: number;
  public organizationId: number;
  public applicationId: number;
  public dataTargetIds: number[];
}
