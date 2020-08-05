export interface ReceivedMessageMetadata {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    sentTime: Date;
    signalData: JSON;
}
