import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { SigFoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxDeviceType } from '@shared/models/sigfox-device-type.model';

@Injectable({
  providedIn: 'root'
})
export class SigfoxService {

  private SIGFOXCONTRACTURL = 'sigfox-contract';
  private SIGFOXGROUPURL = 'sigfox-group';
  private SIGFOXDEVICETYPEURL = 'sigfox-device-type';

  constructor(private restService: RestService) { }

  // Contract
  public getContracts(groupid: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXCONTRACTURL, params, groupid);
  }

  //Group
  getGroups(organisationId: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, organisationId);
  }

  getGroup(groupId: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, groupId);
  }

  createGroupConnection(body: SigFoxGroup): Observable<any> {
    return this.restService.post(this.SIGFOXGROUPURL, body);
  }

  updateGroupConnection(body: SigFoxGroup, id: number) {
    return this.restService.put(this.SIGFOXGROUPURL, body, id);
  }

  //Device-type

  public getDeviceType(id: string, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXDEVICETYPEURL, params, id);
  }

  public getDeviceTypes(organizationId: number): Observable<any> {
    const body = { organizationId };
    return this.restService.get(this.SIGFOXDEVICETYPEURL, body);
  }

  public postDeviceType(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    return this.restService.post(this.SIGFOXDEVICETYPEURL, sigfoxGroup, { observe: 'response' });
  }

  public putDeviceType(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    return this.restService.put(this.SIGFOXDEVICETYPEURL, sigfoxGroup, sigfoxGroup.contractId);
  }
}
