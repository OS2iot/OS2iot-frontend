import { SigfoxGroup } from './sigfox-group.model';

export class SigfoxDeviceType {
    name: string;
    contractId: string;
    description: string;
    keepAlive?: number;
    alertEmail?: string;
    groupId?: SigfoxGroup;
}

export class SigfoxDeviceTypeResponse {
    data: SigfoxDeviceType[];
}