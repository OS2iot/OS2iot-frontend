import { Application } from "@applications/application.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { MulticastType } from "@shared/enums/multicast-type";

export class MulticastResponse {
    id: number;
    application: Application;
    iotDevices: IotDevice[];
    groupName: string;
    lorawanMulticastDefinition: LorawanMulticastDefinition;
    // periodicity: number; -> only if classB is gonna be used
    createdAt: string;
    updatedAt: string;
    createdBy: number;
    updatedBy: number;
    createdByName: string;
    updatedByName: string;
}

export class LorawanMulticastDefinition {
    address: string;
    networkSessionKey: string;
    applicationSessionKey: string;
    frameCounter = 0;
    dataRate = 0;
    frequency = 0;
    groupType: MulticastType;
    chirpstackGroupId?: string;
}
