import { Injectable } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Observable } from 'rxjs';
import {
  Organisation,
  OrganisationResponse,
  OrganisationGetManyResponse,
  OrganisationGetMinimalResponse,
} from './organisation.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  URL = 'organization';
  URLMINIMAL ='organization/minimal'

  constructor(private restService: RestService) { }

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

  getMinimal(): Observable<OrganisationGetMinimalResponse> {
    return this.restService.get(this.URLMINIMAL, {}).pipe(shareReplay(1));
  }

  getMultiple(): Observable<OrganisationGetManyResponse> {
    return this.restService.get(this.URL);
  }

  delete(id: number) {
    return this.restService.delete(this.URL, id);
  }
}
