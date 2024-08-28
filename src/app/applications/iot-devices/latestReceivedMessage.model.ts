export interface LatestReceivedMessage {
  createdAt: Date;
  updatedAt: Date;
  rawData?: Record<string, unknown>;
  rssi?: number;
  snr?: number;
  sentTime: Date;
}
