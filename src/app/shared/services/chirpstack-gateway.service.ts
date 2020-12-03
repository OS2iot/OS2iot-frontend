import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayResponse, Gateway, GatewayData, GatewayRequest, GatewayResponseMany } from '@app/gateway/gateway.model';
import * as moment from 'moment';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { map } from 'rxjs/operators';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl = 'chirpstack/gateway';

  constructor(
    private restService: RestService,
    private sharedVariableService: SharedVariableService,
    private userMinimalService: UserMinimalService) {
    moment.locale('da');
  }

  public get(id: string, params = {}): Observable<GatewayResponse> {
    return this.restService.get(this.chripstackGatewayUrl, params, id)
      .pipe(
        map(
          (response: GatewayResponse) => {
            response.gateway.internalOrganizationName = this.sharedVariableService.getOrganizationInfo()
              .find(org => org.id === response.gateway.internalOrganizationId)?.name;
            //move createdat and updatedat to next level ease the use.
            response.gateway.updatedAt = response.updatedAt;
            response.gateway.createdAt = response.createdAt;
            response.gateway.lastSeenAt = response.lastSeenAt;
            response.gateway.createdByName = this.userMinimalService.getUserNameFrom(response.gateway.createdBy);
            response.gateway.updatedByName = this.userMinimalService.getUserNameFrom(response.gateway.updatedBy);
            return response;
          }
        )
      );
  }

  public getMultiple(params = {}): Observable<GatewayResponseMany> {
    return this.restService.get(this.chripstackGatewayUrl, params).pipe(
      map(
        (response: GatewayResponseMany) => {
          response.result.map(
            (gateway) => {
              gateway.internalOrganizationName = this.sharedVariableService.getOrganizationInfo()
                .find(org => org.id === gateway.internalOrganizationId)?.name;
            }
          );
          return response;
        }
      )
    );
  }

  public post(gateway: Gateway): Observable<GatewayData> {
    const gatewayRequest: GatewayRequest = new GatewayRequest;
    gatewayRequest.gateway = gateway;
    gatewayRequest.organizationId = this.sharedVariableService.getSelectedOrganisationId();
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
