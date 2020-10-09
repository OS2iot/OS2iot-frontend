import { SigfoxSettings } from '@app/sigfox/sigfox-settings.model';
import { Application } from '@applications/application.model';
import { DeviceType } from '@shared/enums/device-type';
import { JsonLocation } from '@shared/models/Json-location.model';
import { LorawanSettings } from '@shared/models/lorawan-settings.model';
import { ReceivedMessageMetadata } from '@shared/models/received-message-metadata.model';
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
    sigFoxSettings = new SigfoxSettings();
}

export interface IotDevicesResponse {
    data: IotDevice[];
    ok?: boolean;
    count?: number;
}
