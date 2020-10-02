import { Application } from '@applications/application.model';
import { DeviceType } from '@shared/enums/device-type';
import { JsonLocation } from '@shared/models/Json-location.model';
import { LorawanSettings } from '@shared/models/lorawan-settings.model';
import { ReceivedMessageMetadata } from '@shared/models/received-message-metadata.model';
import { SigfoxSettings } from '@shared/models/sigfox-settings.model';
import { LatestReceivedMessage } from './latestReceivedMessage.model';

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
    latestReceivedMessage: LatestReceivedMessage;
    lorawanSettings = new LorawanSettings();
    sigfoxSettings = new SigfoxSettings();
    errorMessages = [];
    importStatus = '';
}

export interface IotDeviceData {
    data: IotDevice[];
    ok?: boolean;
    count?: number;
}
