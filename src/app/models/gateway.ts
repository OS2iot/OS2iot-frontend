import { CommonLocation } from './common-location';

export class Gateway {
    id?: string;
    name?: string;
    description?: string;
    location: CommonLocation = new CommonLocation;
    discoveryEnabled = false;
    gatewayProfileID: string = null;
    tagsString = '{}';
    tags?: JSON;
    lastSeenAt: Date;
}

export class GatewayData {
    data: Gateway[];
    ok?: boolean;
    count?: number;
}

export class GatewayRequest {
    gateway: Gateway;
}

export class GatewayResponse {
    createdAt: string;
    updatedAt: string;
    firstSeenAt: string;
    lastSeenAt: string;
    gateway: Gateway;
    stats: GatewayStats[];
}

export interface GatewayStats {
    timestamp: Date;
    rxPacketsReceived: number;
    rxPacketsReceivedOK: number;
    txPacketsReceived: number;
    txPacketsEmitted: number;
}
