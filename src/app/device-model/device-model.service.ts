import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { DeviceModel } from './device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceModelService {

  private DEVICEMODELURL = 'devicemodel';

  constructor(private restService: RestService) { }

  create(body: DeviceModel): Observable<any> {
    return this.restService.post(this.DEVICEMODELURL, body, { observe: 'response' });
  }

  update( body: PermissionRequest, id: number): Observable<any> {
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
