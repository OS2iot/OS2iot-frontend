import { Injectable } from '@angular/core';
import {
  AllGatewayStatusResponse,
  GetAllGatewayStatusParameters,
  GetGatewayStatusParameters,
  GatewayStatus,
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
    params: GetAllGatewayStatusParameters
  ): Observable<AllGatewayStatusResponse> {
    return this.restService.get(`${this.baseUrl}/status`, params);
  }

  public getStatus(
    id: string,
    params: GetGatewayStatusParameters
  ): Observable<GatewayStatus> {
    return this.restService.get(
      `${this.baseUrl}/status`,
      params,
      id
    );
  }
}
