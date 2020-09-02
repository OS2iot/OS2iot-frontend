import { ReceivedMessageMetadata } from './received-message-metadata';
import { Application } from './application';
import { JsonLocation } from './Json-location';

export class IotDevice {
    name: string;
    application?: Application;
    location: JsonLocation;
    commentOnLocation: string;
    comment: string;
    type: string;
    receivedMessagesMetadata: ReceivedMessageMetadata[];
    metadata?: JSON;
    apiKey?: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    applicationId: number;
    longitude: number = 0;
    latitude: number = 0;
}

export interface IotDeviceData {
    data: IotDevice[];
    ok?: boolean;
    count?: number;
}
