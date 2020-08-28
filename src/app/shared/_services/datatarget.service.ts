import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatatargetData, Datatarget } from 'src/app/models/datatarget';
import { SortDir, SortCol } from 'src/app/models/sort';
import { RestService } from './rest.service';
import { DatatargetResponse } from 'src/app/models/datatarget-response';

@Injectable({
  providedIn: 'root'
})
export class DatatargetService {

  private url: string = 'data-target';

  constructor(private restService: RestService) { }

  get(id: number): Observable<DatatargetResponse> {
    return this.restService.get(this.url, null, id);
  }

  getMulitple(
    limit: number,offset: number, sort: SortDir, orderOn: SortCol
  ): Observable<DatatargetData> {
    const body = {
      limit: limit,
      offset: offset,
      //sort: sort,
      //orderOn: orderOn,
      //todo tilføj når iot-314 er tilføjet
    };
    return this.restService.get(this.url, body)
  }

  update(datatarget: Datatarget): Observable<DatatargetResponse> {
    return this.restService.replace(this.url,datatarget,datatarget.id,{observe: 'response'});

  }

  create(datatarget: Datatarget): Observable<DatatargetData> {
    return this.restService.post(this.url,datatarget);
  }

  delete(id: number) {
    return this.restService.delete(this.url,id);
  }

}
