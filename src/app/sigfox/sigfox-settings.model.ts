import { Path } from 'typescript';

export class SigfoxSettings {
    deviceId?: string;
    deviceTypeId?: string;
    groupId: number;
    connectToExistingDeviceInBackend = false;
    pac?: string;
    endProductCertificate?: string;
    prototype =  false;
    sigfoxGroupData: SigfoxGroupData;
}

export interface SigfoxGroupData {
    id: string;
    name: string;
    description: string;
    type: number;
    timezone: string;
    nameCI: string;
    path: Path[];
    currentPrototypeCount: number;
    createdBy: string;
    creationTime: number;
    leaf: boolean;
    actions: string[];
}
