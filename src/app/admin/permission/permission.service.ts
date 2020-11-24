import { Injectable } from '@angular/core';
import { RestService } from '../../shared/services/rest.service';
import { Observable } from 'rxjs';
import {
  PermissionGetManyResponse,
  PermissionResponse,
  PermissionRequest,
} from './permission.model';
import { map } from 'rxjs/operators';
import { UserMinimalService } from '../users/user-minimal.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  endpoint = 'permission';
  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService) { }

  createPermission(body: PermissionRequest): Observable<PermissionResponse> {
    return this.restService.post(this.endpoint, body, { observe: 'response' });
  }

  updatePermission(
    body: PermissionRequest,
    id: number
  ): Observable<PermissionResponse> {
    return this.restService.put(this.endpoint, body, id, {
      observe: 'response',
    });
  }

  getPermission(id: number): Observable<PermissionResponse> {
    return this.restService.get(this.endpoint, {}, id).pipe(
      map(
        (response: PermissionResponse) => {
          response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
          response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
          return response;
        }
      )
    );
  }

  getPermissions(): Observable<PermissionGetManyResponse> {
    return this.restService.get(this.endpoint);
  }

  deletePermission(id: number) {
    return this.restService.delete(this.endpoint, id);
  }
}
