import { Injectable } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Observable } from 'rxjs';
import {
  Organisation,
  OrganisationResponse,
  OrganisationGetManyResponse,
  OrganisationGetMinimalResponse,
} from './organisation.model';
import { map, shareReplay } from 'rxjs/operators';
import { UserMinimalService } from '../users/user-minimal.service';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  URL = 'organization';
  URLMINIMAL = 'organization/minimal';

  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService) { }

  post(body: Organisation): Observable<OrganisationResponse> {
    return this.restService.post(this.URL, body);
  }

  put(body: Organisation, id: number): Observable<OrganisationResponse> {
    return this.restService.put(this.URL, body, id, {
      observe: 'response',
    });
  }

  getOne(id: number): Observable<OrganisationResponse> {
    return this.restService.get(this.URL, {}, id)
      .pipe(
        map(
          (response: OrganisationResponse) => {
            response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
            response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
            return response;
          }
        )
      );
  }

  getMinimal(): Observable<OrganisationGetMinimalResponse> {
    const test = this.restService.get(this.URLMINIMAL, {}).pipe(shareReplay(1));
    console.log('Minimal Organization Response', test);
    return test;
  }

  getMultiple(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string,
  ): Observable<OrganisationGetManyResponse> {
    return this.restService.get(this.URL, {
      limit,
      offset,
      orderOn: orderByColumn,
      sort: orderByDirection,
    });
  }

  delete(id: number) {
    return this.restService.delete(this.URL, id);
  }
}
