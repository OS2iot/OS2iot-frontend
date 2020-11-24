
export class DeviceModelBody {
    id?: string;
    name?: string;
    private type = 'DeviceModel';
    brandName?: string;
    modelName?: string;
    manufacturerName?: string;
    category?: string;
    energyLimitationClass?: string;
    controlledProperty?: string[];
    supportedUnits?: string[];
    function?: string[];
    supportedProtocol?: string[];
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;

    constructor(
        id?: string,
        name?: string,
        brandName?: string,
        modelName?: string,
        manufacturerName?: string,
        category?: string,
        energyLimitationClass?: string,
        controlledProperty?: string[],
        supportedUnits?: string[],
        sensorFunction?: string[],
        supportedProtocol?: string[],
        createdAt?: string,
        updatedAt?: string,
        createdBy?: number,
        updatedBy?: number)
        {
            this.id = id;
            this.name = name;
            this.type = 'DeviceModel';
            this.brandName = brandName;
            this.modelName = modelName;
            this.manufacturerName = manufacturerName;
            this.category = category;
            this.energyLimitationClass = energyLimitationClass;
            this.controlledProperty = controlledProperty;
            this.supportedUnits = supportedUnits;
            this.function = sensorFunction;
            this.supportedProtocol = supportedProtocol;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.createdBy = createdBy;
            this.updatedBy = updatedBy;
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
