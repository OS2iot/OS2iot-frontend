import { DataTargetType } from '@shared/enums/datatarget-type';
import { OpenDataDkDataset as OpenDataDkDataset } from './opendatadk/opendatadk-dataset.model';

export class Datatarget {
    id: number;
    name: string;
    applicationId: number;
    type: DataTargetType = DataTargetType.HTTPPUSH;
    url: string;
    tenant: string;
    context: string;
    // default 30 sec
    timeout = 30000;
    authorizationHeader: string;
    tokenEndpoint: string;
    clientId: string;
    clientSecret: string;
    setToOpendataDk = false;
    openDataDkDataset: OpenDataDkDataset = new OpenDataDkDataset();
    mqttPort?: number;
    mqttTopic?: string;
    mqttQos?: string;
    mqttUsername?: string;
    mqttPassword?: string;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    createdByName: string;
    updatedByName: string;
}

export class DatatargetData {
    data: Datatarget[];
    ok?: boolean;
    count?: number;
}

export class DatatargetTypeDescriptor {
    name: string;
    type: DataTargetType;
    icon: string;
    description: string;
    readMoreUrl: string;
    provider: string;
}

export class OddkMailInfo {
    organizationId?: number;
    organizationOddkAlias: string;
    comment?: string;
    sharingUrl?: string
}