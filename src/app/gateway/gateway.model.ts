import { EditPermission } from "@shared/models/edit-permission.model";
import { CommonLocation } from "@shared/models/common-location.model";
import { GatewayPlacement, GatewaySetupStatus, GatewayStatusInterval } from "./enums/gateway-status-interval.enum";
import { Organisation } from "@app/admin/organisation/organisation.model";

export class Gateway extends EditPermission {
  id: number;
  gatewayId: string;
  name: string;
  description?: string;
  location: CommonLocation = new CommonLocation();

  placement: GatewayPlacement = GatewayPlacement.NONE;
  modelName?: string;
  antennaType?: string;
  status?: GatewaySetupStatus = GatewaySetupStatus.NONE;
  gatewayResponsibleName?: string;
  gatewayResponsibleEmail?: string;
  gatewayResponsiblePhoneNumber?: string;
  operationalResponsibleName?: string;
  operationalResponsibleEmail?: string;

  tagsString: string;
  tags?: JSON;
  rxPacketsReceived: number;
  txPacketsEmitted: number;
  lastSeenAt: Date;
  organizationId: number;
  organizationName: string;
  organization: Organisation;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
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

export class UpdateGatewayOrganization {
  public organizationId: number;
}
