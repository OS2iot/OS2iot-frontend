import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { IotDevice, IotDeviceData } from '../../models/iot-device';

@Injectable({
    providedIn: 'root',
})
export class IoTDeviceService {
    constructor(private restService: RestService) {}

    createIoTDevice(body: any, applicationId?: number): Observable<IotDeviceData> {
        console.log('Lav iot enhed!');
        applicationId ? body['applicationId'] = applicationId : null;
        body['longitude'] ? body['longitude'] = +body['longitude'] : null;
        body['latitude'] ? body['latitude'] = +body['latitude'] : null;
        return this.restService.post('iot-device', body);
    }

    getIoTDevice(id: number): Observable<IotDevice> {
        return this.restService.get('iot-device', {}, id);
    }

    deleteIoTDevice(id: number) {
        return this.restService.delete('iot-device', id);
    }
}
