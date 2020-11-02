export interface ReceivedMessageMetadata {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    sentTime: string;
    signalData: JSON;
}
