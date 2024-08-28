import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { MulticastType } from "@shared/enums/multicast-type";

export class Multicast {
  id: number;
  applicationID: number;
  iotDevices?: IotDevice[];
  name: string;
  mcAddr: string;
  mcNwkSKey: string;
  mcAppSKey: string;
  fCnt: number = 0;
  dr: number = 0;
  frequency: number = 0;
  groupType: MulticastType;
  // periodicity: number; -> only if classB is gonna be used
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
}

export class MulticastData {
  data: Multicast[];
  ok?: boolean;
  count?: number;
}
