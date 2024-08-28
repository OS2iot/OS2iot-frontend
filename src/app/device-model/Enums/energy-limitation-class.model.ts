export class EnergyLimitationClass {
    energyLimits: EnergyLimit[];

    constructor() {
        this.energyLimits = [
            { code: "E0", name: "Event energy-limited" },
            { code: "E1", name: "Period energy-limited" },
            { code: "E2", name: "Lifetime energy-limited" },
            { code: "E9", name: "No direct quantitative limitations to available energy" },
        ];
    }
}

export class EnergyLimit {
    code: string;
    name: string;
}
