import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserMinimalService } from '../users/user-minimal.service';
import {
  ApiKeyGetManyResponse,
  ApiKeyRequest,
  ApiKeyResponse,
} from './api-key.model';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  endpoint = 'api-key';
  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService
  ) {}

  create(body: ApiKeyRequest): Observable<ApiKeyResponse> {
    return this.restService.post(this.endpoint, body, {
      observe: 'response',
    });
  }

  get(id: number): Observable<ApiKeyResponse> {
    return this.restService.get(this.endpoint, {}, id).pipe(
      map((response: ApiKeyResponse) => {
        response.createdByName = this.userMinimalService.getUserNameFrom(
          response.createdBy
        );
        response.updatedByName = this.userMinimalService.getUserNameFrom(
          response.updatedBy
        );
        return response;
      })
    );
  }

  getApiKeys(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string,
    userId?: number,
    organisationId?: number
  ): Observable<ApiKeyGetManyResponse> {
    if (userId) {
      return this.restService.get(this.endpoint, {
        limit,
        offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
        userId,
      });
    } else if (organisationId) {
      return this.restService.get(this.endpoint, {
        limit,
        offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
        organisationId,
      });
    } else {
      return this.restService.get(this.endpoint, {
        limit,
        offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
      });
    }
  }

  delete(id: number) {
    return this.restService.delete(this.endpoint, id);
  }
}
