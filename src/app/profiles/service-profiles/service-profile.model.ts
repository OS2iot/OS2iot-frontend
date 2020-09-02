export class ServiceProfile {
    id: string;
    name: string;
    networkServerID: string;
    addGWMetaData: boolean;
    channelMask: string;
    devStatusReqFreq: number;
    dlBucketSize: number;
    dlRate: number;
    dlRatePolicy: string;
    drMax: number;
    drMin: number;
    hrAllowed: boolean;
    minGWDiversity: number;
    nwkGeoLoc: boolean;
    organizationID: string;
    prAllowed: boolean;
    raAllowed: boolean;
    reportDevStatusBattery: boolean;
    reportDevStatusMargin: boolean;
    targetPER: number;
    ulBucketSize: number;
    ulRate: number;
    ulRatePolicy: string;
}

export interface ServiceProfileData {
    data: ServiceProfile[];
    ok?: boolean;
    count?: number;
}