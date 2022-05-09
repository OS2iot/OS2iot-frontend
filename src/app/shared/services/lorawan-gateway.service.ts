import { Injectable } from '@angular/core';
import {
  GatewayStatusResponse,
  GetGatewayStatusParameters,
} from '@app/gateway/gateway.model';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class LoRaWANGatewayService {
  private baseUrl = 'lorawan/gateway';

  constructor(private restService: RestService) {}

  public getAllStatus(
    params: GetGatewayStatusParameters
  ): Observable<GatewayStatusResponse> {
    return this.restService.get(`${this.baseUrl}/status`, params);
  }
}
