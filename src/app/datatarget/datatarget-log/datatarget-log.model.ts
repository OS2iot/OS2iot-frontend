import { IotDevice } from "@applications/iot-devices/iot-device.model";

export class DatatargetLog {
  createdAt: Date;

  type: string;
  message: string;
  statusCode?: number;
  iotDevice?: IotDevice;
}
