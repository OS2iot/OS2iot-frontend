import { EditPermission } from '@shared/models/edit-permission.model';
import { CommonLocation } from '../shared/models/common-location.model';
import { GatewayStatusInterval } from './enums/gateway-status-interval.enum';

export class Gateway extends EditPermission {
  gatewayId?: string;
  name?: string;
  description?: string;
  location: CommonLocation = new CommonLocation();
  discoveryEnabled = false;
  gatewayProfileID: string = null;
  tagsString = '{}';
  tagsMap?: Array<[string, string]>;
  lastSeenAt: GrpcTime;
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

export interface GrpcTime {
  seconds: number;
  nanos: number;
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
  resultList: Gateway[];
  totalCount: number;
}

export class GatewayResponse {
  createdAt: string;
  updatedAt: string;
  firstSeenAt: string;
  lastSeenAt: GrpcTime;
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

export interface GetAllGatewayStatusParameters {
  limit?: number;
  offset?: number;
  organizationId?: number;
  timeInterval?: GatewayStatusInterval;
}

export interface StatusTimestamp {
  timestamp: Date;
  wasOnline: boolean;
}

export interface GetGatewayStatusParameters {
  timeInterval?: GatewayStatusInterval;
}

export interface GatewayStatus {
  id: string;
  name: string;
  statusTimestamps: StatusTimestamp[];
}

export interface AllGatewayStatusResponse {
  data: GatewayStatus[];
  count: number;
}
