import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { DeviceType } from '@shared/enums/device-type';
import { Buffer } from 'buffer';

export class BulkMapping {
  public dataMapper(data: IotDevice, applicationId: number): IotDevice {
    switch (data.type.toUpperCase()) {
      case DeviceType.LORAWAN:
        return this.lorawanMapper(data, applicationId);
      case DeviceType.MQTT_BROKER:
        return this.mqttBrokerMapper(data, applicationId);
      case DeviceType.MQTT_SUBSCRIBER:
        return this.mqttSubscriberMapper(data, applicationId);
      case DeviceType.GENERIC_HTTP:
        return this.baseMapper(data, applicationId);
      default:
        break;
    }
  }

  private lorawanMapper(data: any, applicationId): IotDevice {
    const newDevice = this.baseMapper(data, applicationId);
    newDevice.lorawanSettings = {
      devEUI: data.devEUI,
      skipFCntCheck: data.skipFCntCheck
        ? this.convertToBoolean(data.skipFCntCheck)
        : undefined,
      activationType: data.activationType ? data.activationType : undefined,
      OTAAapplicationKey: data.OTAAapplicationKey
        ? data.OTAAapplicationKey
        : undefined,
      devAddr: data.devAddr ? data.devAddr : undefined,
      networkSessionKey: data.networkSessionKey
        ? data.networkSessionKey
        : undefined,
      applicationSessionKey: data.applicationSessionKey
        ? data.applicationSessionKey
        : undefined,
      serviceProfileID: data.serviceProfileID
        ? data.serviceProfileID
        : undefined,
      deviceProfileID: data.deviceProfileID ? data.deviceProfileID : undefined,
      fCntUp: data.fCntUp ? +data.fCntUp : undefined,
      nFCntDown: data.nFCntDown ? +data.nFCntDown : undefined,
      deviceStatusBattery: undefined,
      deviceStatusMargin: undefined,
    };
    newDevice.type = DeviceType.LORAWAN;
    return newDevice;
  }

  private mqttBrokerMapper(data: any, applicationId: number) {
    const newDevice = this.baseMapper(data, applicationId);
    newDevice.mqttBrokerSettings = {
      authenticationType: data.authenticationType,
      caCertificate: undefined,
      deviceCertificate: undefined,
      deviceCertificateKey: undefined,
      mqttPort: undefined,
      mqttURL: undefined,
      mqtttopicname: undefined,
      mqttusername: data.mqttusername,
      mqttpassword: data.mqttpassword,
    };
    newDevice.type = DeviceType.MQTT_BROKER;
    return newDevice;
  }

  private mqttSubscriberMapper(data: any, applicationId: number) {
    const newDevice = this.baseMapper(data, applicationId);
    // if (!this.mqttSubscriberIsValid(data)) {
    //   return;
    // }
    newDevice.mqttSubscriberSettings = {
      authenticationType: data.authenticationType,
      caCertificate: this.base64Decode(data.caCertificate),
      deviceCertificate: this.base64Decode(data.deviceCertificate),
      deviceCertificateKey: this.base64Decode(data.deviceCertificateKey),
      mqttPort: data.mqttPort,
      mqttURL: data.mqttURL,
      mqtttopicname: data.mqtttopicname,
      mqttpassword: data.mqttpassword,
      mqttusername: data.mqttusername,
    };
    newDevice.type = DeviceType.MQTT_SUBSCRIBER;
    return newDevice;
  }

  private base64Decode(input: string) {
    if (!input) {
      return undefined;
    }
    return Buffer.from(input, 'base64').toString('binary');
  }

  private convertToBoolean(text: string): boolean {
    if (text.toUpperCase() === 'TRUE') {
      return true;
    } else {
      return false;
    }
  }

  private baseMapper(data: any, applicationId: number): IotDevice {
    return {
      name: data.name,
      application: undefined,
      location: undefined,
      commentOnLocation: data.commentOnLocation,
      comment: data.comment,
      type: DeviceType.GENERIC_HTTP,
      receivedMessagesMetadata: undefined,
      metadata: undefined,
      apiKey: undefined,
      id: data.id ? data.id : undefined,
      createdAt: undefined,
      updatedAt: undefined,
      applicationId: applicationId,
      longitude: data.longitude ? Number(data.longitude) : 0,
      latitude: data.latitude ? Number(data.latitude) : 0,
      latestReceivedMessage: undefined,
      lorawanSettings: undefined,
      sigfoxSettings: undefined,
      mqttBrokerSettings: undefined,
      mqttSubscriberSettings: undefined,
      createdBy: undefined,
      updatedBy: undefined,
      updatedByName: undefined,
      createdByName: undefined,
      deviceModelId: data.deviceModelId != '' ? +data.deviceModelId : undefined,
    };
  }
}
