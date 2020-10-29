import { ControlledPropperty } from './Enums/controlled-propperty.enum';
import { DeviceCategory } from './Enums/device-category.enum';
import { DeviceFunction } from './Enums/device-function.enum';
import { EnergyLimitationClass } from './Enums/energy-limitation-class.enum';
import { SupportedProtocol } from './Enums/supported-protocol.enum';
import { SupportedUnit } from './supported-unit.model';


export class DeviceModel {
    name: string;
    id: string;
    private type = 'DeviceModel';
    brandName: string;
    modelName: string;
    manufacturerName: string;
    controlledProperty: ControlledPropperty;
    category: DeviceCategory;
    supportedUnits: SupportedUnit;
    function: DeviceFunction;
    energyLimitationClass: EnergyLimitationClass;
    supportedProtocol: SupportedProtocol;
}
