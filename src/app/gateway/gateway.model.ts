import { EditPermission } from '@shared/models/edit-permission.model';
import { CommonLocation } from '../shared/models/common-location.model';

export class Gateway extends EditPermission {
    id?: string;
    name?: string;
    description?: string;
    location: CommonLocation = new CommonLocation;
    discoveryEnabled = false;
    gatewayProfileID: string = null;
    tagsString = '{}';
    tags?: JSON;
    lastSeenAt: string;
    organizationID?: number;
    internalOrganizationId: number;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    createdByName: string;
    updatedByName: string;
    public internalOrganizationName?: string;
    map(): Map<string, number> {
        throw new Error('Method not implemented.');
    }
}

export class GatewayData {
    data: Gateway[];
    ok?: boolean;
    count?: number;
}

export class GatewayRequest {
    gateway: Gateway;
    organizationId: number;
}

export class GatewayResponseMany {
    result: Gateway[];
    totalCount: number;
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

export interface GatewayStatus {
  id: string;
  onlineTimestamps: Date[];
}
