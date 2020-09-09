import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IotDevice, IotDeviceData } from './iot-device.model';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable({
    providedIn: 'root',
})
export class IoTDeviceService {
    constructor(private restService: RestService) { }

    createIoTDevice(body: IotDevice): Observable<IotDeviceData> {
        return this.restService.post('iot-device', body);
    }

    updateIoTDevice(body: IotDevice, id: number): Observable<IotDeviceData> {
        return this.restService.replace('iot-device', body, id, { observe: 'response' });
    }

    getIoTDevice(id: number): Observable<IotDevice> {
        return this.restService.get('iot-device', {}, id);
    }

    deleteIoTDevice(id: number) {
        return this.restService.delete('iot-device', id);
    }
}
