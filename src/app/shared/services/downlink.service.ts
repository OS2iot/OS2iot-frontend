import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { Downlink } from '@applications/iot-devices/downlink.model';

@Injectable({
  providedIn: 'root'
})
export class DownlinkService {

  private IOTDEVICEURL = 'iot-device/';
  private DOWNLINKURL = 'downlink';
  private MULTICASTURL = 'multicast/';
  private DOWNLINKMULTICASTURL = 'downlink-multicast';

  constructor(private restService: RestService) { }

  public get(deviceId: number, params = {}): Observable<any> {
    const url = this.IOTDEVICEURL + deviceId + '/' + this.DOWNLINKURL;
    return this.restService.get(url, params);
  }

  public post(downlink: Downlink, deviceId: number, params = {}): Observable<any> {
    const url = this.IOTDEVICEURL + deviceId + '/' + this.DOWNLINKURL;
    return this.restService.post(url, downlink, params);
  }

  
  public multicastGet(multicastId: number, params = {}): Observable<any> {
    const url = this.MULTICASTURL + multicastId + '/' + this.DOWNLINKMULTICASTURL;
    return this.restService.get(url, params);
  }
  public multicastPost(downlink: Downlink, multicastId: number, params = {}): Observable<any> {
    const url = this.MULTICASTURL + multicastId + '/' + this.DOWNLINKMULTICASTURL;
    return this.restService.post(url, downlink, params);
  }
}
