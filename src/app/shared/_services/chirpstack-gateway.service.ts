import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayData, Gateway } from 'src/app/models/gateway';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl: string = 'chirpstack/gateway'

  constructor(private restService: RestService) { }

  public get(id: string = null, params = {}): Observable<Gateway> {
    return this.restService.get(this.chripstackGatewayUrl, params, id);
  }

  public post(gateway: Gateway): Observable<GatewayData> {
    var gatewayData = new GatewayData();
    gatewayData.data = [gateway];
     
    return this.restService.post(this.chripstackGatewayUrl, gateway, {observe: 'response'});
  }

  public put(gateway: Gateway, id: number): Observable<GatewayData> {
    return this.restService.replace(this.chripstackGatewayUrl, gateway, id)
  }

  public delete(id: string): Observable<any> {
    return this.restService.delete(this.chripstackGatewayUrl, id);
  }
}
