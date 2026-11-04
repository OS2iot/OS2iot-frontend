import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { PayloadDecoder } from "./payload-decoder.model";
import { Datatarget } from "@app/datatarget/datatarget-models/datatarget.model";
import { Application } from "@applications/application.model";

export class PayloadDeviceDatatarget {
  id: number;
  iotDeviceIds: number[];
  payloadDecoderId: number;
  dataTargetId: number;
  applicationId: number;
  defaultConnection: boolean = false;
}

export interface DataTargetConnectionGetManyResponse {
  data: DataTargetConnectionResponse[];
  count: number;
}

export interface DataTargetConnectionResponse {
  id: number;
  iotDevices: IotDevice[];
  payloadDecoder: PayloadDecoder;
  dataTarget: Datatarget;
  application: Application;
  defaultConnection: boolean;
}

export class AppendCopiedDeviceDto {
  deviceId: number;
}

export class DataTargetConnection implements DataTargetConnectionResponse {
  id: number;
  iotDevices: IotDevice[];
  payloadDecoder: PayloadDecoder;
  dataTarget: Datatarget;
  application: Application;
  defaultConnection: boolean;
}
