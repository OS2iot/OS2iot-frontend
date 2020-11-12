import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayResponse, Gateway, GatewayData, GatewayRequest } from '@app/gateway/gateway.model';
import * as moment from 'moment';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl = 'chirpstack/gateway';

  constructor(
    private restService: RestService,
    private sharedVariableService: SharedVariableService) {
    moment.locale('da');
   }

  public get(id: string, params = {}): Observable<GatewayResponse> {
    return this.restService.get(this.chripstackGatewayUrl, params, id);
  }

  public getMultiple(params = {}): Observable<any> {
    return this.restService.get(this.chripstackGatewayUrl, params);
  }

  public post(gateway: Gateway): Observable<GatewayData> {
    if (gateway.organizationID === null) {
      gateway.organizationID = this.sharedVariableService.getSelectedOrganisationId();
    }
    const gatewayRequest: GatewayRequest = new GatewayRequest;
    gatewayRequest.gateway = gateway;
    return this.restService.post(this.chripstackGatewayUrl, gatewayRequest, { observe: 'response' });
  }

  public put(gateway: Gateway, id: string): Observable<GatewayResponse> {
    const gatewayRequest: GatewayRequest = new GatewayRequest;
    gatewayRequest.gateway = gateway;
    return this.restService.put(this.chripstackGatewayUrl, gatewayRequest, id);
  }

  public delete(id: string): Observable<any> {
    return this.restService.delete(this.chripstackGatewayUrl, id);
  }

  public isGatewayActive(gateway: Gateway): boolean {
    const errorTime = new Date();
    errorTime.setSeconds(errorTime.getSeconds() - 150);
    if (gateway?.lastSeenAt) {
      const lastSeenAtUnixTimestamp = moment(gateway?.lastSeenAt).unix();
      const errorTimeUnixTimestamp = moment(errorTime).unix();
      return errorTimeUnixTimestamp < lastSeenAtUnixTimestamp;
    } else {
      return false;
    }
  }
}
