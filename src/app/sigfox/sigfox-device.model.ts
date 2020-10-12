export interface SigfoxDevice {
    id: string;
    name: string;
    satelliteCapable: boolean;
    sequenceNumber: number;
    lastCom: any;
    state: number;
    comState: number;
    pac: string;
    location: Location;
    deviceType: string;
    group: string;
    lqi: number;
    activationTime: any;
    token: Token;
    contract: string;
    creationTime: any;
    modemCertificate: string;
    prototype: boolean;
    productCertificate: string;
    automaticRenewal: boolean;
    automaticRenewalStatus: number;
    createdBy: string;
    lastEditionTime: any;
    lastEditedBy: string;
    activable: boolean;
}

export interface Token {
    state: number;
    detailMessage: string;
    end: any;
    freeMessages?: number;
    freeMessagesSent?: number;
}

export interface SigfoxDevicesResponse {
    data: SigfoxDevice[];
}
