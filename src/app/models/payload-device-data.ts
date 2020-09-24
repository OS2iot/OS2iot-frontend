import { PayloadDecoder } from '@app/payload-decoder/payload-decoder.model';
import { IotDevice } from '@my-applications/iot-devices/iot-device.model';
import { Datatarget } from './datatarget';

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
