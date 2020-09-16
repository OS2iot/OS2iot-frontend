export class DeviceProfile {
    public id: string;
    public name: string;
    public classBTimeout: number;
    public classCTimeout = 0;
    public factoryPresetFreqs: string[];
    public geolocBufferTTL = 0;
    public geolocMinBufferSize = 0;
    public macVersion: string;
    public maxDutyCycle: number;
    public maxEIRP = 0;
    public payloadDecoderScript: string;
    public payloadEncoderScript: string;
    public pingSlotDR: number;
    public pingSlotFreq: number;
    public pingSlotPeriod: number;
    public regParamsRevision: string;
    public rfRegion: string;
    public rxDROffset1 = 0;
    public rxDataRate2 = 0;
    public rxDelay1 = 0;
    public rxFreq2 = 0;
    public supports32BitFCnt: boolean;
    public supportsClassB: boolean;
    public supportsClassC: boolean;
    public supportsJoin: boolean;
}
export interface DeviceProfileResponse {
    result: DeviceProfile[];
    totalCount?: string;
}
