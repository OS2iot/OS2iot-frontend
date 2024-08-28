import { SigfoxGroup } from "./sigfox-group.model";

export class SigfoxDeviceType {
    id: string;
    name: string;
    contractId: string;
    description: string;
    keepAlive?: number;
    alertEmail?: string;
    groupId?: number;
}

export class SigfoxDeviceTypeResponse {
    data: SigfoxDeviceType[];
}
