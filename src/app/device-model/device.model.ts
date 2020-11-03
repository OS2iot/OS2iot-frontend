import { Organisation } from '@app/admin/organisation/organisation.model';
import { ControlledPropperty } from './Enums/controlled-propperty.enum';
import { DeviceCategory } from './Enums/device-category.enum';
import { DeviceFunction } from './Enums/device-function.enum';
import { EnergyLimitationClass } from './Enums/energy-limitation-class.enum';
import { SupportedProtocol } from './Enums/supported-protocol.enum';
import { SupportedUnit } from './supported-unit.model';


export class DeviceModel {
    name?: string;
    id?: number;
    urn?: string;
    private type = 'DeviceModel';
    brandName?: string;
    modelName?: string;
    manufacturerName?: string;
    controlledProperty?: ControlledPropperty;
    category?: DeviceCategory;
    supportedUnits?: SupportedUnit;
    function?: DeviceFunction;
    energyLimitationClass?: EnergyLimitationClass;
    supportedProtocol?: SupportedProtocol;

    constructor() {
        this.type = 'DeviceModel';
    }
}

export class DeviceModelRequest {
    body: JSON;
    belongsToId: number;

    constructor(deviceModel: DeviceModel, organisationId: number) {
        this.body = JSON.parse(JSON.stringify(deviceModel));
        this.belongsToId = organisationId;
    }
}
