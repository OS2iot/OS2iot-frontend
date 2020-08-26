import { CommonLocation } from './common-location';

export class Gateway {
    id: string;
    name: string;
    description: string;
    organizationID: string;
    networkServerID: string;
    location: CommonLocation;
    tags?: string;
    
    networkServerName?: string;
    createdAt?: string;
    updatedAt?: string;
    firstSeenAt?: string;
    lastSeenAt?: string;
}

export class GatewayData {
    data: Gateway[];
    ok?: boolean;
    count?: number;
}