import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayResponse, Gateway, GatewayData, GatewayRequest } from '@app/gateway/gateway.model';
import { Downlink } from '@applications/iot-devices/downlink.model';

@Injectable({
  providedIn: 'root'
})
export class DownlinkService {

  private DOWNLINKURL = 'downlink';

  constructor(private restService: RestService) { }

  public post(downlink: Downlink, params = {}): Observable<any> {
    return this.restService.post(this.DOWNLINKURL, downlink, params);
  }
}
