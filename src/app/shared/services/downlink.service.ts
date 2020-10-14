import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayResponse, Gateway, GatewayData, GatewayRequest } from '@app/gateway/gateway.model';
import { Downlink } from '@applications/iot-devices/downlink.model';

@Injectable({
  providedIn: 'root'
})
export class DownlinkService {

  private IOTDEVICEURL = 'iot-device/';
  private DOWNLINKURL = 'downlink';

  constructor(private restService: RestService) { }

  public post(downlink: Downlink, deviceId: number, params = {}): Observable<any> {
    const url = this.IOTDEVICEURL + deviceId + '/' + this.DOWNLINKURL;
    return this.restService.post(url, downlink, params);
  }
}
