
export class ServiceProfile {
    public id: string;
    public name: string;
    public networkServerID: string;
    public addGWMetaData: boolean;
    public channelMask: string;
    public devStatusReqFreq: number;
    public dlBucketSize: number;
    public dlRate: number;
    public dlRatePolicy: string;
    public drMax: number;
    public drMin: number;
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

export interface ServiceProfileData {
    result: ServiceProfile[];
    totalCount?: string;
}
