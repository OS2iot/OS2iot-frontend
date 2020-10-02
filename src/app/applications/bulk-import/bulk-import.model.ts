import { IotDevice } from '@applications/iot-devices/iot-device.model';

export class BulkImport {
    device: IotDevice;
    errorMessages = [];
    importStatus = '';
    constructor(device: IotDevice, errorMessages = [], importStatus = '') {
        this.device = device;
        this.errorMessages = errorMessages;
        this.importStatus = importStatus;
    }
}
