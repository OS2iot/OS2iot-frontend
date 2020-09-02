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

    constructor(
        id: string,
        name: string,
        networkServerID: string,
        addGWMetaData: boolean,
        channelMask: string,
        devStatusReqFreq: number,
        dlBucketSize: number,
        dlRate: number,
        dlRatePolicy: string,
        drMax: number,
        drMin: number,
        hrAllowed: boolean,
        minGWDiversity: number,
        nwkGeoLoc: boolean,
        organizationID: string,
        prAllowed: boolean,
        raAllowed: boolean,
        reportDevStatusBattery: boolean,
        reportDevStatusMargin: boolean,
        targetPER: number,
        ulBucketSize: number,
        ulRate: number,
        ulRatePolicy: string) {
        this.id = id;
        this.name = name;
        this.networkServerID = networkServerID;
        this.addGWMetaData = addGWMetaData;
        this.channelMask = channelMask;
        this.devStatusReqFreq = devStatusReqFreq;
        this.dlBucketSize = dlBucketSize;
        this.dlRate = dlRate;
        this.dlRatePolicy = dlRatePolicy;
        this.drMax = drMax;
        this.drMin = drMin;
        this.hrAllowed = hrAllowed;
        this.minGWDiversity = minGWDiversity;
        this.nwkGeoLoc = nwkGeoLoc;
        this.organizationID = organizationID;
        this.prAllowed = prAllowed;
        this.raAllowed = raAllowed;
        this.reportDevStatusBattery = reportDevStatusBattery;
        this.reportDevStatusMargin = reportDevStatusMargin;
        this.targetPER = targetPER;
        this.ulBucketSize = ulBucketSize;
        this.ulRate = ulRate;
        this.ulRatePolicy = ulRatePolicy;
    }
}

// export interface ServiceProfileData {
//     data: ServiceProfile[];
//     ok?: boolean;
//     count?: number;
// }