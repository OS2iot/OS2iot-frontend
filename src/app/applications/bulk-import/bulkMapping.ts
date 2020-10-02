import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { DeviceType } from '@shared/enums/device-type';

export class BulkMapping {

    public dataMapper(data: any, applicationId: number): IotDevice {

        switch (data.type) {
          case DeviceType.LORAWAN:
            return this.lorawanMapper(data, applicationId);
          case DeviceType.GENERICHTTP:
            return this.baseMapper(data, applicationId);
          default:
            break;
        }
        return new IotDevice();
    }

    private lorawanMapper(data: any, applicationId): IotDevice {
        const newDevice = this.baseMapper(data, applicationId);
        newDevice.lorawanSettings = {
            devEUI: data.devEUI,
            skipFCntCheck: data.skipFCntCheck ? data.skipFCntCheck : null,
            activationType: data.activationType ? data.activationType : null,
            OTAAapplicationKey: data.OTAAapplicationKey ? data.OTAAapplicationKey : null,
            devAddr: data.devAddr ? data.devAddr : null,
            networkSessionKey: data.networkSessionKey ? data.networkSessionKey : null,
            applicationSessionKey: data.applicationSessionKey ? data.applicationSessionKey : null,
            serviceProfileID: data.serviceProfileID ? data.serviceProfileID : null,
            deviceProfileID: data.deviceProfileID ? data.deviceProfileID : null
        };
        newDevice.type = DeviceType.LORAWAN;
        return newDevice;
    }

    private baseMapper(data: any, applicationId: number): IotDevice {
        return {
            name: data.name,
            application: null,
            location: null,
            commentOnLocation: data.commentOnLocation,
            comment: data.comment,
            type: DeviceType.GENERICHTTP,
            receivedMessagesMetadata: null,
            metadata: null,
            apiKey: null,
            id: data.id ? data.id : null,
            createdAt: null,
            updatedAt: null,
            applicationId: applicationId,
            longitude: data.longitude ? Number(data.longitude) : 0,
            latitude: data.latitude ? Number(data.latitude) : 0,
            latestReceivedMessage: null,
            lorawanSettings: null,
            sigfoxSettings: null,
            importStatus: '',
            errorMessages: []
        };
    }
}
