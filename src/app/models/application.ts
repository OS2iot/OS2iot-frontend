import { IotDevice } from '../my-applications/iot-devices/iot-device.model';

export class Application {
    public id: number;
    public createdAt: string;
    public updatedAt: string;
    public name: string;
    public description: string;
    public iotDevices?: IotDevice[];
}

export interface ApplicationData {
    data: Application[];
    ok?: boolean;
    count?: number;
}
