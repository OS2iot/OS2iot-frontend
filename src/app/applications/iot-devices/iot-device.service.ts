import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IotDevice, IotDevicesResponse } from './iot-device.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { map } from 'rxjs/operators';

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
        return this.restService.get(this.BASEURL, {}, id).pipe(
            map(
                response => {
                    return {
                        name: response.name,
                        application: response.application,
                        location: response.location,
                        commentOnLocation: response.commentOnLocation,
                        comment: response.comment,
                        type: response.type,
                        receivedMessagesMetadata: response.receivedMessagesMetadata,
                        metadata: response.metadata,
                        apiKey: response.apiKey,
                        id: response.id,
                        createdAt: response.createdAt,
                        updatedAt: response.updatedAt,
                        applicationId: response.applicationId,
                        longitude: response.longitude,
                        latitude: response.latitude,
                        deviceModelId: response.deviceModel?.id,
                        latestReceivedMessage: response.latestReceivedMessage,
                        lorawanSettings: response.lorawanSettings,
                        sigfoxSettings: response.sigfoxSettings,
                    };
                }
            )
        );
    }

    deleteIoTDevice(id: number) {
        return this.restService.delete(this.BASEURL, id);
    }
}
