import { PayloadDecoder } from '@app/payload-decoder/payload-decoder.model';
import { IotDevice } from '@my-applications/iot-devices/iot-device.model';
import { Datatarget } from './datatarget';

export class PayloadDeviceDatatarget {
    devices: number[];
    payloadDecoderId: number;
    datatargetId: number;
}
