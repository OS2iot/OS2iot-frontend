import { ControlledPropperty } from './Enums/controlled-propperty.enum';
import { DeviceCategory } from './Enums/device-category.enum';
import { DeviceFunction } from './Enums/device-function.enum';
import { EnergyLimitationClass } from './Enums/energy-limitation-class.enum';
import { SupportedProtocol } from './Enums/supported-protocol.enum';
import { SupportedUnit } from './supported-unit.model';

export class DeviceModelBody {
    name?: string;
    id?: string;
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

    constructor(
        id?: string,
        name?: string,
        brandName?: string,
        modelName?: string,
        manufacturerName?: string,
        category?: string,
        energyLimitationClass?: string) {
            this.id = id;
            this.name = name;
            this.type = 'DeviceModel';
            this.brandName = brandName;
            this.modelName = modelName;
            this.manufacturerName = manufacturerName;
            this.category = DeviceCategory[category];
            this.energyLimitationClass = EnergyLimitationClass[energyLimitationClass];
        }
}
export class DeviceModel {
    id: number;
    body: DeviceModelBody = new DeviceModelBody();

    constructor(id?: number, body: DeviceModelBody = new DeviceModelBody()) {
        this.id = id;
        this.body = body;
    }
}

export class DeviceModelRequest {
    body: JSON;
    belongsToId: number;

    constructor(body: DeviceModelBody, organisationId: number) {
        this.body = JSON.parse(JSON.stringify(body));
        this.belongsToId = organisationId;
    }
}
