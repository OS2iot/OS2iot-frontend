import { IotDevice } from './iot-device';

export interface Application {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    iotDevice: IotDevice[];
}
