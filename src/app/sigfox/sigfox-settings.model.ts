export class SigfoxSettings {
  deviceId?: string;
  deviceTypeId?: string;
  deviceTypeName?: string;
  groupId: number;
  groupName: string;
  connectToExistingDeviceInBackend = false;
  pac?: string;
  endProductCertificate?: string;
  prototype = false;
  sigfoxGroupData: SigfoxGroupData;
}

export interface SigfoxGroupData {
  id: string;
  name: string;
  description: string;
  type: number;
  timezone: string;
  nameCI: string;
  path: string[];
  currentPrototypeCount: number;
  createdBy: string;
  creationTime: number;
  leaf: boolean;
  actions: string[];
}
