import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IotDevice, IotDevicesResponse } from './iot-device.model';
import { RestService } from 'src/app/shared/services/rest.service';

@Injectable({
    providedIn: 'root',
})
export class IoTDeviceService {

    private BASEURL = 'iot-device';

    constructor(private restService: RestService) { }

    createIoTDevice(body: IotDevice): Observable<IotDevicesResponse> {
        return this.restService.post(this.BASEURL, body);
    }

    updateIoTDevice(body: IotDevice, id: number): Observable<IotDevicesResponse> {
        return this.restService.put(this.BASEURL, body, id, { observe: 'response' });
    }

    getIoTDevice(id: number): Observable<IotDevice> {
        return this.restService.get(this.BASEURL, {}, id);
    }

    deleteIoTDevice(id: number) {
        return this.restService.delete(this.BASEURL, id);
    }
}
