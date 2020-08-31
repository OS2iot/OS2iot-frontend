import { CommonLocation } from './common-location';

export class Gateway {
    id?: string;
    name?: string;
    description?: string;
    organizationID?: string = '1';
    location: CommonLocation = new CommonLocation;
    discoveryEnabled: boolean = false;
    gatewayProfileID: string = null;
    tags?: string;
    metadata?: string;
    
/*     networkServerName?: string;
    createdAt?: string;
    updatedAt?: string;
    firstSeenAt?: string;
    lastSeenAt?: string; */
}

export class GatewayData {
    data: Gateway[];
    ok?: boolean;
    count?: number;
}

export class GatewayRequest {
    gateway: Gateway;
}