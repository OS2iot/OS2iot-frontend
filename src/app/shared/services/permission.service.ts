import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import {
  PermissionGetManyResponse,
  PermissionResponse,
  PermissionRequest,
} from '../../admin/permission/permission.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  endpoint = 'permission';
  constructor(private restService: RestService) {}

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
    return this.restService.get(this.endpoint, {}, id);
  }

  getPermissions(): Observable<PermissionGetManyResponse> {
    return this.restService.get(this.endpoint);
  }

  deletePermission(id: number) {
    return this.restService.delete(this.endpoint, id);
  }
}
