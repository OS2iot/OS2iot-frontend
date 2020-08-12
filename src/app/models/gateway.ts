import { CommonLocation } from './common-location';

export interface Gateway {
    id: string;
    name: string;
    description: string;
    organizationID: string;
    networkServerID: string;
    location: CommonLocation;
    
    networkServerName?: string;
    createdAt?: string;
    updatedAt?: string;
    firstSeenAt?: string;
    lastSeenAt?: string;
}