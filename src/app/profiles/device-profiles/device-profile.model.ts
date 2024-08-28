import { EditPermission } from "@shared/models/edit-permission.model";

export class DeviceProfile extends EditPermission {
  public id: string;
  public name: string;
  public adrAlgorithmID = "default";
  public classBTimeout = 0;
  public classCTimeout = 0;
  public macVersion: MacVersionMap[keyof MacVersionMap];
  public pingSlotDR = 0;
  public pingSlotFreq = 0;
  public pingSlotPeriod = 0;
  public regParamsRevision: RegParamsRevisionMap[keyof RegParamsRevisionMap];
  public rfRegion: string;
  public rxDROffset1 = 0;
  public rxDataRate2 = 0;
  public rxDelay1 = 0;
  public rxFreq2 = 0;
  public supportsClassB: boolean;
  public supportsClassC: boolean;
  public supportsJoin = true;
  public devStatusReqFreq: number;
  public organizationID?: number;
  public internalOrganizationId: number;
  public internalOrganizationName?: string;
  public createdAt: string;
  public updatedAt: string;
  public createdBy: number;
  public updatedBy: number;
  public createdByName: string;
  public updatedByName: string;
}
export interface DeviceProfileResponse {
  result: DeviceProfile[];
  totalCount?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceProfileResponseOne {
  deviceProfile: DeviceProfile;
  createdAt: string;
  updatedAt: string;
}

export class DeviceProfileRequest {
  deviceProfile: DeviceProfile;
  internalOrganizationId: number;
  constructor(deviceProfile: DeviceProfile, orgId: number = null) {
    this.deviceProfile = deviceProfile;
    this.internalOrganizationId = orgId;
  }
}
export interface MacVersionMap {
  LORAWAN_1_0_0: 0;
  LORAWAN_1_0_1: 1;
  LORAWAN_1_0_2: 2;
  LORAWAN_1_0_3: 3;
  LORAWAN_1_0_4: 4;
  LORAWAN_1_1_0: 5;
}

export interface RegParamsRevisionMap {
  A: 0;
  B: 1;
  RP002_1_0_0: 2;
  RP002_1_0_1: 3;
  RP002_1_0_2: 4;
  RP002_1_0_3?: 5;
}
