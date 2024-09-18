import { Application } from "@applications/application.model";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { OpenDataDkDataset } from "./opendatadk/opendatadk-dataset.model";

export class DatatargetResponse {
  application: Application;
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
  lastMessageDate?: Date
}
