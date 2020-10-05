import { Injectable } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { Observable } from 'rxjs';
import { SigfoxDeviceType } from './sigfox-device-type.model';

@Injectable({
  providedIn: 'root'
})
export class SigfoxGroupService {

  private SIGFOXDEVICETYPEURL = 'sigfox-device-type';

  constructor(private restService: RestService) { }

  public getOne(id: string, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXDEVICETYPEURL, params, id);
  }

  public getMultiple(organizationId: number): Observable<any> {
    const body = { organizationId };
    return this.restService.get(this.SIGFOXDEVICETYPEURL, body);
  }

  public post(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    return this.restService.post(this.SIGFOXDEVICETYPEURL, sigfoxGroup, { observe: 'response' });
  }

  public put(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    return this.restService.put(this.SIGFOXDEVICETYPEURL, sigfoxGroup, sigfoxGroup.contractId);
  }
}
