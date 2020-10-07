
export interface SigFoxApiContractInfosContent {
    id: string;
    name: string;
    order: string;
    contractId: string;
    group: string;
    userId: string;
    startTime: number;
    communicationEndTime: number;
    timezone: string;
    maxUplinkFrames: number;
    maxDownlinkFrames: number;
    tokenDuration: number;
    maxTokens: number;
    activationEndTime: number;
    automaticRenewal: boolean;
    renewalDuration: number;
    blacklistedTerritories: any[];
    createdBy: string;
    lastEditionTime: number;
    lastEditedBy: string;
    bidir: boolean;
    highPriorityDownlink: boolean;
    tokensInUse: number;
    tokensUsed: number;
    creationTime: number;
}
