import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayData } from 'src/app/models/gateway';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl: string = 'chirpstack/gateway'

  constructor(private restService: RestService) { }

  public get(id: string = null, params = {}): Observable<any> {
    return this.restService.get(this.chripstackGatewayUrl, params, id)
  }

  public post(body: any): Observable<GatewayData> {
    return this.restService.post(this.chripstackGatewayUrl, body, {observe: 'response'});
  }

  public put(body: any, id: number): Observable<GatewayData> {
    return this.restService.replace(this.chripstackGatewayUrl, body, id)
  }

  public delete(id: string): Observable<any> {
    return this.restService.delete(this.chripstackGatewayUrl, id);
  }
}
