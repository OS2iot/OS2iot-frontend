import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import {
  Organisation,
  OrganisationResponse,
  OrganisationGetManyResponse,
} from '../../admin/organisation/organisation.model';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  URL = 'organization';

  constructor(private restService: RestService) {}

  post(body: Organisation): Observable<OrganisationResponse> {
    return this.restService.post(this.URL, body);
  }

  put(body: Organisation, id: number): Observable<OrganisationResponse> {
    return this.restService.put(this.URL, body, id, {
      observe: 'response',
    });
  }

  getOne(id: number): Observable<OrganisationResponse> {
    return this.restService.get(this.URL, {}, id);
  }

  getMultiple(): Observable<OrganisationGetManyResponse> {
    return this.restService.get(this.URL);
  }

  delete(id: number) {
    return this.restService.delete(this.URL, id);
  }
}
