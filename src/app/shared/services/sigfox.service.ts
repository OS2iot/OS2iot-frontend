import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { SigfoxGroup } from '@shared/models/sigfox-group.model';
import { SigfoxDeviceType, SigfoxDeviceTypeResponse } from '@shared/models/sigfox-device-type.model';
import { SigfoxDevicesResponse } from '@sigfox/sigfox-device.model';

@Injectable({
  providedIn: 'root'
})
export class SigfoxService {

  private SIGFOXCONTRACTURL = 'sigfox-contract';
  private SIGFOXDEVICEURL = 'sigfox-api-device';
  private SIGFOXGROUPURL = 'sigfox-group';
  private SIGFOXDEVICETYPEURL = 'sigfox-device-type';

  constructor(private restService: RestService) { }

  // Contract
  public getContracts(groupId: number): Observable<any> {
    const body = {groupId};
    return this.restService.get(this.SIGFOXCONTRACTURL, body);
  }

  // device
  public getDevices(groupId: number): Observable<SigfoxDevicesResponse> {
    const body = {groupId};
    return this.restService.get(this.SIGFOXDEVICEURL, body);
  }

  // Group
  getGroups(organizationId: number): Observable<any> {
    const params = {organizationId};
    return this.restService.get(this.SIGFOXGROUPURL, params);
  }

  getGroup(groupId: number, params = {}): Observable<any> {
    return this.restService.get(this.SIGFOXGROUPURL, params, groupId);
  }

  createGroupConnection(body: SigfoxGroup): Observable<any> {
    return this.restService.post(this.SIGFOXGROUPURL, body);
  }

  updateGroupConnection(body: SigfoxGroup, groupId: number) {
    return this.restService.put(this.SIGFOXGROUPURL, body, groupId);
  }

  // Device-type
  public getDeviceType(deviceTypeId: string, groupId: number): Observable<any> {
    const body = { groupeId: groupId };
    return this.restService.get(this.SIGFOXDEVICETYPEURL, body, deviceTypeId);
  }

  public getDeviceTypes(groupId: number): Observable<SigfoxDeviceTypeResponse> {
    const body = { groupId };
    return this.restService.get(this.SIGFOXDEVICETYPEURL, body);
  }

  public postDeviceType(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    const url = this.SIGFOXDEVICETYPEURL + '?groupId=' + sigfoxGroup.groupId.toString();
    console.log(url);
    return this.restService.post(url, sigfoxGroup, { observe: 'response' });
  }

  public putDeviceType(sigfoxGroup: SigfoxDeviceType): Observable<any> {
    return this.restService.put(this.SIGFOXDEVICETYPEURL, sigfoxGroup, sigfoxGroup.contractId);
  }
}
