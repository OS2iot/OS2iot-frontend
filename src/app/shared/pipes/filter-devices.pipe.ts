import { Pipe, PipeTransform } from "@angular/core";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { DeviceType } from "@shared/enums/device-type";

@Pipe({
    name: "filterDevices",
})
export class FilterDevicesPipe implements PipeTransform {
    transform(value: IotDevice[] | undefined, ..._: unknown[]): IotDevice[] {
        // Filter devices so only LoRaWAN devices will be shown.
        const lorawanDevices: IotDevice[] = [];

        if (!value) {
            return lorawanDevices;
        }
        value.forEach(device => {
            if (device.type === DeviceType.LORAWAN) {
                lorawanDevices.push(device);
            }
        });

        lorawanDevices.sort((a, b) => a.name.localeCompare(b.name));

        return lorawanDevices;
    }
}
