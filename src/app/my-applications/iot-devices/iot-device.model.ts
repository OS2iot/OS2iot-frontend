import { Application } from 'src/app/models/application';
import { JsonLocation } from 'src/app/models/Json-location';
import { ReceivedMessageMetadata } from 'src/app/models/received-message-metadata';


export class IotDevice {
    name: string;
    application?: Application;
    location: JsonLocation;
    commentOnLocation: string;
    comment: string;
    type: string = "GENERIC_HTTP";
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
