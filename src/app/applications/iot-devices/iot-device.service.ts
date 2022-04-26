import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IotDevice, IoTDevicesMinimalResponse, IotDevicesImportResponse, IotDeviceImportRequest, IoTDeviceStatsResponse } from './iot-device.model';
import { RestService } from 'src/app/shared/services/rest.service';
import { map } from 'rxjs/operators';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';

@Injectable({
    providedIn: 'root',
})
export class IoTDeviceService {

    private BASEURL = 'iot-device';

    constructor(
        private restService: RestService,
        private userMinimalService: UserMinimalService
        ) { }

    createIoTDevice(body: IotDevice): Observable<IotDevice> {
        return this.restService.post(this.BASEURL, body);
    }

    updateIoTDevice(body: IotDevice, id: number): Observable<IotDevice> {
        return this.restService.put(this.BASEURL, body, id, { observe: 'response' });
    }

    createIoTDevices(body: IotDeviceImportRequest): Observable<IotDevicesImportResponse[]> {
        return this.restService.post(`${this.BASEURL}/createMany`, body);
    }

    updateIoTDevices(body: IotDeviceImportRequest): Observable<IotDevicesImportResponse[]> {
        return this.restService.post(`${this.BASEURL}/updateMany`, body);
    }

    getIoTDevice(id: number): Observable<IotDevice> {
        return this.restService.get(this.BASEURL, {}, id).pipe(
            map(
                (response: IotDevice) => {
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
                        createdBy: response.createdBy,
                        updatedBy: response.updatedBy,
                        createdByName: this.userMinimalService.getUserNameFrom(response.createdBy),
                        updatedByName: this.userMinimalService.getUserNameFrom(response.updatedBy)
                    };
                }
            )
        );
    }

    getIoTDevicesUsingPayloadDecoderMinimal(payloadDecoderId: number, limit: number, offset: number): Observable<IoTDevicesMinimalResponse> {
        return this.restService.get(`${this.BASEURL}/minimalByPayloadDecoder`, {limit, offset}, payloadDecoderId);
    }

    deleteIoTDevice(id: number) {
        return this.restService.delete(this.BASEURL, id);
    }

    getDeviceStats(id: number): Observable<IoTDeviceStatsResponse[]> {
      return this.restService.get(`${this.BASEURL}/stats`, null, id);
    }
}
