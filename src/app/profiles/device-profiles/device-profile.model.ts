export class DeviceProfile {
    public id: string;
    public name: string;
    public classBTimeout: number;
    public classCTimeout: number;
    public factoryPresetFreqs: string[];
    public geolocBufferTTL: number;
    public geolocMinBufferSize: number;
    public macVersion: string;
    public maxDutyCycle: number;
    public maxEIRP: number;
    public payloadCodec: string;
    public payloadDecoderScript: string;
    public payloadEncoderScript: string;
    public pingSlotDR: number;
    public pingSlotFreq: number;
    public pingSlotPeriod: number;
    public regParamsRevision: string;
    public rfRegion: string;
    public rxDROffset1: number;
    public rxDataRate2: number;
    public rxDelay1: number;
    public rxFreq2: number;
    public supports32BitFCnt: boolean;
    public supportsClassB: boolean;
    public supportsClassC: boolean;
    public supportsJoin: boolean;

    constructor(
        id: string,
        name: string,
        classBTimeout: number,
        classCTimeout: number,
        factoryPresetFreqs: string[],
        geolocBufferTTL: number,
        geolocMinBufferSize: number,
        macVersion: string,
        maxDutyCycle: number,
        maxEIRP: number,
        payloadCodec: string,
        payloadDecoderScript: string,
        payloadEncoderScript: string,
        pingSlotDR: number,
        pingSlotFreq: number,
        pingSlotPeriod: number,
        regParamsRevision: string,
        rfRegion: string,
        rxDROffset1: number,
        rxDataRate2: number,
        rxDelay1: number,
        rxFreq2: number,
        supports32BitFCnt: boolean,
        supportsClassB: boolean,
        supportsClassC: boolean,
        supportsJoin: boolean
    ) {
        this.id = id;
        this.name = name;
        this.classBTimeout = classBTimeout;
        this.classCTimeout = classCTimeout;
        this.factoryPresetFreqs = factoryPresetFreqs;
        this.geolocBufferTTL = geolocBufferTTL;
        this.geolocMinBufferSize = geolocMinBufferSize;
        this.macVersion = macVersion;
        this.maxDutyCycle = maxDutyCycle;
        this.maxEIRP = maxEIRP;
        this.payloadCodec = payloadCodec;
        this.payloadDecoderScript = payloadDecoderScript;
        this.payloadEncoderScript = payloadEncoderScript;
        this.pingSlotDR = pingSlotDR;
        this.pingSlotFreq = pingSlotFreq;
        this.pingSlotPeriod = pingSlotPeriod;
        this.regParamsRevision = regParamsRevision;
        this.rfRegion = rfRegion;
        this.rxDROffset1 = rxDROffset1;
        this.rxDataRate2 = rxDataRate2;
        this.rxDelay1 = rxDelay1;
        this.rxFreq2 = rxFreq2;
        this.supports32BitFCnt = supports32BitFCnt;
        this.supportsClassB = supportsClassB;
        this.supportsClassC = supportsClassC;
        this.supportsJoin = supportsJoin;
    }
}

export interface DeviceProfileData {
    result: DeviceProfile[];
    totalCount?: string;
}
