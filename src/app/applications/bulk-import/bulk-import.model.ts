import { IotDevice } from '@applications/iot-devices/iot-device.model';

export class BulkImport {
    public device: IotDevice;
    public errorMessages = [];
    public importStatus = '';
    constructor(device: IotDevice, errorMessages = [], importStatus = '') {
        this.device = device;
        this.errorMessages = errorMessages;
        this.importStatus = importStatus;
    }
}
