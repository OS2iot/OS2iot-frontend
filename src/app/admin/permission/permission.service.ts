import { Injectable } from "@angular/core";
import { RestService } from "../../shared/services/rest.service";
import { Observable } from "rxjs";
import {
  PermissionGetManyResponse,
  PermissionGetManySlimResponse,
  PermissionRequest,
  PermissionRequestAcceptUser,
  PermissionResponse,
} from "./permission.model";
import { map } from "rxjs/operators";
import { UserMinimalService } from "../users/user-minimal.service";

@Injectable({
  providedIn: "root",
})
export class PermissionService {
  endpoint = "permission";
  applicationAdmin = "/applicationAdmin";
  constructor(private restService: RestService, private userMinimalService: UserMinimalService) {}

  createPermission(body: PermissionRequest): Observable<PermissionResponse> {
    return this.restService.post(this.endpoint, body, {
      observe: "response",
    });
  }

  createPermissionAcceptUser(body: PermissionRequestAcceptUser): Observable<PermissionResponse> {
    return this.restService.put(this.endpoint + "/acceptUser", body, undefined, {
      observe: "response",
    });
  }

  updatePermission(body: PermissionRequest, id: number): Observable<PermissionResponse> {
    return this.restService.put(this.endpoint, body, id, {
      observe: "response",
    });
  }

  getPermission(id: number): Observable<PermissionResponse> {
    return this.restService.get(this.endpoint, {}, id).pipe(
      map((response: PermissionResponse) => {
        response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
        response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
        return response;
      })
    );
  }

  getPermissions(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string,
    userId?: number,
    organisationId?: number,
    ignoreGlobalAdmin?: boolean
  ): Observable<PermissionGetManyResponse> {
    if (userId || organisationId) {
      return this.restService.get(this.endpoint, {
        limit: limit,
        offset: offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
        userId: userId,
        organisationId: organisationId,
        ignoreGlobalAdmin: ignoreGlobalAdmin,
      });
    } else {
      return this.restService.get(this.endpoint, {
        limit: limit,
        offset: offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
        ignoreGlobalAdmin: ignoreGlobalAdmin,
      });
    }
  }

  getPermissionsWhereApplicationAdmin(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string,
    userId?: number,
    organisationId?: number
  ): Observable<PermissionGetManySlimResponse> {
    if (userId || organisationId) {
      return this.restService.get(this.endpoint + this.applicationAdmin, {
        limit: limit,
        offset: offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
        userId: userId,
        organisationId: organisationId,
      });
    } else {
      return this.restService.get(this.endpoint + this.applicationAdmin, {
        limit: limit,
        offset: offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
      });
    }
  }

  getPermissionsWithoutUsers(userId?: number): Observable<PermissionGetManyResponse> {
    return this.restService.get(this.endpoint + "/getAllPermissionsWithoutUsers", {
      limit: 1000,
      offset: 0,
      userId: userId ?? undefined,
      ignoreGlobalAdmin: true,
    });
  }

  deletePermission(id: number) {
    return this.restService.delete(this.endpoint, id);
  }
}
