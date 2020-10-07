import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';

@Injectable({
  providedIn: 'root'
})
export class SigfoxService {

  private SIGFOXCONTRACTURL = 'sigfox-contract';
  private SIGFOXGROUPURL = 'sigfox-group';
  private SIGFOXDEVICETYPEURL = 'sigfox-device-type';

  constructor(private restService: RestService) { }

  public getContracts(groupid: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXCONTRACTURL, params, groupid);
  }

  getManyGroups(organisationId: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, organisationId);
  }

  getGroup(groupId: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, groupId);
  }

  createConnection(body: SigfoxGroup): Observable<any> {
    return this.restService.post(this.SIGFOXGROUPURL, body);
  }

/*   public getMultiple(params = {}): Observable<any> {
    return this.restService.get(this.chripstackGatewayUrl, params);
  }

  public post(gateway: Gateway): Observable<GatewayData> {
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
  } */
}
