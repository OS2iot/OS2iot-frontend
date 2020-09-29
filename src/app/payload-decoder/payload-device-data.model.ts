import { Datatarget } from '@applications/datatarget/datatarget.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { PayloadDecoder } from './payload-decoder.model';


export class PayloadDeviceDatatarget {
    id: number;
    iotDeviceIds: number[];
    payloadDecoderId: number;
    dataTargetId: number;
}

export interface PayloadDeviceDatatargetGetByDataTargetResponse {
    data: PayloadDeviceDatatargetGetByDataTarget[]
}

export interface PayloadDeviceDatatargetGetByDataTarget {
    id: number;
    iotDevices: IotDevice[];
    payloadDecoder: PayloadDecoder;
    dataTarget: Datatarget;
}
