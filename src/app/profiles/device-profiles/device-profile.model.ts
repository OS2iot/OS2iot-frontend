import { EditPermission } from '@shared/models/edit-permission.model';

export class DeviceProfile extends EditPermission {
    public id: string;
    public name: string;
    public classBTimeout = 0;
    public classCTimeout = 0;
    public factoryPresetFreqs: number[];
    public factoryPresetFreqsInput: string;
    public geolocBufferTTL = 0;
    public geolocMinBufferSize = 0;
    public macVersion = '1.0.0';
    public maxDutyCycle = 0;
    public maxEIRP = 0;
    public payloadDecoderScript: string;
    public payloadEncoderScript: string;
    public pingSlotDR = 0;
    public pingSlotFreq = 0;
    public pingSlotPeriod = 0;
    public regParamsRevision = 'A';
    public rfRegion: string;
    public rxDROffset1 = 0;
    public rxDataRate2 = 0;
    public rxDelay1 = 0;
    public rxFreq2 = 0;
    public supports32BitFCnt: boolean;
    public supportsClassB: boolean;
    public supportsClassC: boolean;
    public supportsJoin = true;
    public organizationID?: number;
    public internalOrganizationId: number;
    public internalOrganizationName?: string;
}
export interface DeviceProfileResponse {
    result: DeviceProfile[];
    totalCount?: string;
}

export interface DeviceProfileResponseOne {
    deviceProfile: DeviceProfile;
}

export class DeviceProfileRequest {
    deviceProfile: DeviceProfile;
    internalOrganizationId: number;
    constructor(deviceProfile: DeviceProfile, orgId: number = null) {
        this.deviceProfile = deviceProfile;
        this.internalOrganizationId = orgId
    }
}
