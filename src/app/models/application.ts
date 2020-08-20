import { IotDevice } from './iot-device';

export interface Application {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    iotDevices?: IotDevice[];
}

export interface ApplicationData {
    data: Application[];
    ok?: boolean;
    count?: number;
}
