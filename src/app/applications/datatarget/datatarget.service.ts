import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatargetResponse } from '@applications/datatarget/datatarget-response.model';
import { RestService } from '@shared/services/rest.service';
import { DatatargetData, Datatarget } from './datatarget.model';

@Injectable({
  providedIn: 'root'
})
export class DatatargetService {

  private dataTargetURL = 'data-target';

  constructor(private restService: RestService) { }

  get(id: number): Observable<DatatargetResponse> {
    return this.restService.get(this.dataTargetURL, null, id);
  }

  getByApplicationId(
    limit: number, offset: number, applicationId: number
  ): Observable<DatatargetData> {
    const body = {
      limit,
      offset,
      applicationId
      // sort: sort,
      // orderOn: orderOn,
      // todo tilføj når iot-314 er tilføjet
    };
    return this.restService.get(this.dataTargetURL, body);
  }

  update(datatarget: Datatarget): Observable<DatatargetResponse> {
    return this.restService.put(this.dataTargetURL, datatarget, datatarget.id, { observe: 'response' });

  }

  create(datatarget: Datatarget): Observable<any> {
    return this.restService.post(this.dataTargetURL, datatarget);
  }

  delete(id: number) {
    return this.restService.delete(this.dataTargetURL, id);
  }

}
