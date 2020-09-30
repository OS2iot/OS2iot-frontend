
export class ServiceProfile {
    public id: string;
    public name: string;
    public networkServerID: string;
    public addGWMetaData: boolean;
    public channelMask: string;
    public devStatusReqFreq = 0;
    public dlBucketSize: number;
    public dlRate: number;
    public dlRatePolicy: string;
    public drMax = 5;
    public drMin = 5;
    public hrAllowed: boolean;
    public minGWDiversity: number;
    public nwkGeoLoc: boolean;
    public organizationID: string;
    public prAllowed: boolean;
    public raAllowed: boolean;
    public reportDevStatusBattery: boolean;
    public reportDevStatusMargin: boolean;
    public targetPER: number;
    public ulBucketSize: number;
    public ulRate: number;
    public ulRatePolicy: string;

}

export interface ServiceProfileResponseMany {
    result: ServiceProfile[];
    totalCount?: string;
}

export interface ServiceProfileResponseOne {
    serviceProfile: ServiceProfile;
}

export class ServiceProfileRequest {
    serviceProfile: ServiceProfile;
    constructor(serviceProfile: ServiceProfile) {
        this.serviceProfile = serviceProfile;
    }
}
