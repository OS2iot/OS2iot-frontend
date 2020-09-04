export class DeviceProfile {
    public id: string;
    public name: string;
    public classBTimeout: number,
    public classCTimeout: number,
    public factoryPresetFreqs: Array,
    public geolocBufferTTL: number,
    public geolocMinBufferSize: number,
    public macVersion": "string",
public maxDutyCycle": 0,
public maxEIRP": 0,
public payloadCodec": "string",
public payloadDecoderScript": "string",
public payloadEncoderScript": "string",
public pingSlotDR": 0,
public pingSlotFreq": 0,
public pingSlotPeriod": 0,
public regParamsRevision": "string",
public rfRegion": "string",
public rxDROffset1": 0,
public rxDataRate2": 0,
public rxDelay1": 0,
public rxFreq2": 0,
public supports32BitFCnt": true,
public supportsClassB": true,
public supportsClassC": true,
public supportsJoin": true
}
constructor(
    id: string,
    name: string,
    "classBTimeout": 0,
    "classCTimeout": 0,
    "factoryPresetFreqs": [
    0
],
    "geolocBufferTTL": 0,
    "geolocMinBufferSize": 0,
    "macVersion": "string",
    "maxDutyCycle": 0,
    "maxEIRP": 0,
    "payloadCodec": "string",
    "payloadDecoderScript": "string",
    "payloadEncoderScript": "string",
    "pingSlotDR": 0,
    "pingSlotFreq": 0,
    "pingSlotPeriod": 0,
    "regParamsRevision": "string",
    "rfRegion": "string",
    "rxDROffset1": 0,
    "rxDataRate2": 0,
    "rxDelay1": 0,
    "rxFreq2": 0,
    "supports32BitFCnt": true,
    "supportsClassB": true,
    "supportsClassC": true,
    "supportsJoin": true){

}


export interface DeviceProfileData {
    result: DeviceProfile[];
    totalCount?: string;
}