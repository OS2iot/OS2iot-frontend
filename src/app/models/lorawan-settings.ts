import { ActivationType } from '../shared/enums/activation-type';

export class LorawanSettings {
    devEUI: string;
    isDisabled = false;
    skipFCntCheck = false;
    activationType: ActivationType;
    OTAAapplicationKey?: string;
    devAddr?: string;
    networkSessionKey?: string;
    applicationSessionKey?: string;
}
