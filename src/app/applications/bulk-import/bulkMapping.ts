import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { DeviceType } from '@shared/enums/device-type';

export class BulkMapping {

    public dataMapper(data: IotDevice, applicationId: number): IotDevice {

        switch (data.type.toUpperCase()) {
          case DeviceType.LORAWAN:
            return this.lorawanMapper(data, applicationId);
          case DeviceType.GENERICHTTP:
            return this.baseMapper(data, applicationId);
          default:
            break;
        }
        //return new IotDevice();
    }

    private lorawanMapper(data: any, applicationId): IotDevice {
        const newDevice = this.baseMapper(data, applicationId);
        newDevice.lorawanSettings = {
            devEUI: data.devEUI,
            skipFCntCheck: data.skipFCntCheck ? this.convertToBoolean(data.skipFCntCheck) : undefined,
            activationType: data.activationType ? data.activationType : undefined,
            OTAAapplicationKey: data.OTAAapplicationKey ? data.OTAAapplicationKey : undefined,
            devAddr: data.devAddr ? data.devAddr : undefined,
            networkSessionKey: data.networkSessionKey ? data.networkSessionKey : undefined,
            applicationSessionKey: data.applicationSessionKey ? data.applicationSessionKey : undefined,
            serviceProfileID: data.serviceProfileID ? data.serviceProfileID : undefined,
            deviceProfileID: data.deviceProfileID ? data.deviceProfileID : undefined,
            fCntUp: data.fCntUp ? data.fCntUp : undefined,
            nFCntDown: data.nFCntDown ? data.nFCntDown : undefined
        };
        newDevice.type = DeviceType.LORAWAN;
        return newDevice;
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
            type: DeviceType.GENERICHTTP,
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
            sigfoxSettings: undefined
        };
    }
}
