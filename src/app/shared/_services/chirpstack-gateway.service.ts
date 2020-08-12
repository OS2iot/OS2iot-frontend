import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl: string = 'chirpstack/gateway'

  constructor(private restService: RestService) { }

  public get(id: number = null, params = {}): Observable<any> {
    return this.restService.get(this.chripstackGatewayUrl, params, id)
  }
}
