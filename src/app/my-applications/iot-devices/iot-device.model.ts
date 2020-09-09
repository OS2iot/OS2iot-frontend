import { ReceivedMessageMetadata } from './received-message-metadata';
import { Application } from './application';
import { JsonLocation } from './Json-location';
import { DeviceType } from '../shared/enums/device-type';
import { LorawanSettings } from './lorawan-settings';

export class IotDevice {
    name: string;
    application?: Application;
    location: JsonLocation;
    commentOnLocation: string;
    comment: string;
    type: DeviceType = DeviceType.GENERICHTTP;
    receivedMessagesMetadata: ReceivedMessageMetadata[];
    metadata?: JSON;
    apiKey?: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    applicationId: number;
    longitude = 0;
    latitude = 0;
    lorawanSettings = new LorawanSettings();
}

export interface IotDeviceData {
    data: IotDevice[];
    ok?: boolean;
    count?: number;
}
