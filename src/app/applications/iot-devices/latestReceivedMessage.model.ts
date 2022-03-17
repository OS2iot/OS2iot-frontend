export interface LatestReceivedMessage {
    createdAt: Date;
    updatedAt: Date;
    rawData: Record<string, unknown>;
    sentTime: Date;
}
