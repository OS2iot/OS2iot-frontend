import { DataTargetType } from "@shared/enums/datatarget-type";
import { OpenDataDkDataset } from "@app/datatarget/opendatadk/opendatadk-dataset.model";
import { Organisation } from "@app/admin/organisation/organisation.model";

export class DatatargetResponse {
  organization: Organisation;
  id: number;
  name: string;
  timeout: number;
  type: DataTargetType;
  url: string;
  tenant: string;
  context: string;
  authorizationHeader: string;
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  openDataDkDataset: OpenDataDkDataset;
  mqttPort?: number;
  mqttTopic?: string;
  mqttQos?: string;
  mqttUsername?: string;
  mqttPassword?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  lastMessageDate?: Date;
  hasRecentErrors?: boolean;
}
