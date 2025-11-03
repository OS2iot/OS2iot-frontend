import { Injectable } from "@angular/core";
import { RestService } from "../../shared/services/rest.service";
import { Observable } from "rxjs";
import {
  Organisation,
  OrganisationResponse,
  OrganisationGetManyResponse,
  OrganisationGetMinimalResponse,
} from "./organisation.model";
import { map, shareReplay } from "rxjs/operators";
import { UserMinimalService } from "../users/user-minimal.service";

@Injectable({
  providedIn: "root",
})
export class OrganisationService {
  URL = "organization";
  URLMINIMAL = "organization/minimal";
  URLMINIMAL_NEWKOMBIT = "kombitCreation/minimal";

  constructor(private restService: RestService, private userMinimalService: UserMinimalService) {}

  post(body: Organisation): Observable<OrganisationResponse> {
    return this.restService.post(this.URL, body);
  }

  put(body: Organisation, id: number): Observable<OrganisationResponse> {
    return this.restService.put(this.URL, body, id, {
      observe: "response",
    });
  }

  getOne(id: number): Observable<OrganisationResponse> {
    return this.restService.get(this.URL, {}, id).pipe(
      map((response: OrganisationResponse) => {
        response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
        response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
        return response;
      })
    );
  }

  getMinimalNoPerm(): Observable<OrganisationGetMinimalResponse> {
    return this.restService.get(this.URLMINIMAL_NEWKOMBIT, {}).pipe(shareReplay(1));
  }

  getMultiple(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string
  ): Observable<OrganisationGetManyResponse> {
    return this.restService.get(this.URL, {
      limit,
      offset,
      orderOn: orderByColumn,
      sort: orderByDirection,
    });
  }

  getMultipleWithApplicationAdmin(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string
  ): Observable<OrganisationGetManyResponse> {
    return this.restService.get(`${this.URL}/applicationAdmin`, {
      limit,
      offset,
      orderOn: orderByColumn,
      sort: orderByDirection,
    });
  }

  getMultipleWithGatewayAdmin(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string
  ): Observable<OrganisationGetManyResponse> {
    return this.restService.get(`${this.URL}/gatewayAdmin`, {
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
