import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable } from 'rxjs';
import { DeviceModel, DeviceModelRequest } from './device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceModelService {

  private DEVICEMODELURL = 'device-model';

  constructor(
    private restService: RestService,
    private sharedVariable: SharedVariableService) { }

  create(deviceModel: DeviceModel): Observable<any> {
    const body = new DeviceModelRequest(deviceModel, +this.sharedVariable.getSelectedOrganisationId());
    return this.restService.post(this.DEVICEMODELURL, body, { observe: 'response' });
  }

  update(deviceModel: DeviceModel, id: number): Observable<any> {
    const body = new DeviceModelRequest(deviceModel, +this.sharedVariable.getSelectedOrganisationId);
    return this.restService.put(this.DEVICEMODELURL, body, id, {
      observe: 'response',
    });
  }

  get(id: number): Observable<any> {
    return this.restService.get(this.DEVICEMODELURL, {}, id);
  }

  getMultiple(): Observable<any> {
    return this.restService.get(this.DEVICEMODELURL);
  }

  delete(id: number) {
    return this.restService.delete(this.DEVICEMODELURL, id);
  }
}
