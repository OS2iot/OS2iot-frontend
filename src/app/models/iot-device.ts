import { ReceivedMessageMetadata } from './received-message-metadata';
import { Application } from './application';
import { JsonLocation } from './Json-location';
export interface IotDevice {
    name: string;
    application: Application;
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
}
