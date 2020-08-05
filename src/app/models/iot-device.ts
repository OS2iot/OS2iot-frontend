import { ReceivedMessageMetadata } from './received-message-metadata';
export interface IotDevice {
    name: string;
    application: number;
    location: JSON;
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
