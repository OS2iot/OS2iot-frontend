import { Datatarget } from "@applications/datatarget/datatarget.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { PayloadDecoder } from "./payload-decoder.model";

export class PayloadDeviceDatatarget {
  id: number;
  iotDeviceIds: number[];
  payloadDecoderId: number;
  dataTargetId: number;
}

export interface PayloadDeviceDatatargetGetManyResponse {
  data: PayloadDeviceDatatargetResponse[];
}

export interface PayloadDeviceDatatargetResponse {
  id: number;
  iotDevices: IotDevice[];
  payloadDecoder: PayloadDecoder;
  dataTarget: Datatarget;
}
