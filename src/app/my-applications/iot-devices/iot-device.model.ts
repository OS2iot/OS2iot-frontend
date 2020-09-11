import { Application } from 'src/app/models/application';
import { JsonLocation } from 'src/app/models/Json-location';
import { LorawanSettings } from 'src/app/models/lorawan-settings';
import { ReceivedMessageMetadata } from 'src/app/models/received-message-metadata';
import { DeviceType } from 'src/app/shared/enums/device-type';

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
