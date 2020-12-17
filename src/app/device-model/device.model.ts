
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
    ) {
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

    }
}

export class DeviceModelResponse {
    data: DeviceModel[];
    count: number;
}

export class DeviceModel {
    id: number;
    body: DeviceModelBody = new DeviceModelBody();
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    createdByName: string;
    updatedByName: string;

    constructor(id?: number,
        body: DeviceModelBody = new DeviceModelBody(),
        createdAt?: string,
        updatedAt?: string,
        createdBy?: number,
        updatedBy?: number,
        createdByName?: string,
        updatedByName?: string) {
        this.id = id;
        this.body = body;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdByName = createdByName;
        this.updatedByName = updatedByName;
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
