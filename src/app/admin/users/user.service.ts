import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organisation } from '../organisation/organisation.model';
import { UserMinimalService } from './user-minimal.service';
import {
  UserResponse,
  UserRequest,
  UserGetManyResponse,
  CreateNewKombitUserDto,
  UpdateUserOrgsDto,
  RejectUserDto,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'user';
  URL_NEW_KOMBIT = "kombitCreation"

  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService
  ) {}

  post(body: UserRequest): Observable<UserResponse> {
    return this.restService.post(this.URL, body);
  }

  put(body: UserRequest, id: number): Observable<UserResponse> {
    return this.restService.put(this.URL, body, id, {
      observe: 'response',
    });
  }

  getOne(id: number, extendedInfo = false): Observable<UserResponse> {
    return this.restService
      .get(this.URL, { extendedInfo: extendedInfo }, id)
      .pipe(
        map((response: UserResponse) => {
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

  getMultiple(
    limit: number = 1000,
    offset: number = 0,
    orderByColumn?: string,
    orderByDirection?: string,
    permissionId?: number
  ): Observable<UserGetManyResponse> {
    if (permissionId != null) {
      return this.restService.get(`permission/${permissionId}/users`, {
        limit: limit,
        offset: offset,
      });
    } else {
      return this.restService.get(this.URL, {
        limit: limit,
        offset: offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
      });
    }
  }

  hideWelcome(id: number): Observable<boolean> {
    return this.restService.put(`${this.URL}/${id}/hide-welcome`, null, null);
  }
    
  getAwaitingUsers(
    limit: number = 1000,
    offset: number = 0,
    organizationId: number,
    orderByColumn?: string,
    orderByDirection?: string
  ): Observable<UserGetManyResponse> {
    return this.restService.get(
      this.URL + '/awaitingUsers',
      {
        limit,
        offset,
        orderOn: orderByColumn,
        sort: orderByDirection,
      },
      organizationId
    );
  }

  getOneSimple(id: number): Observable<UserResponse> {
    return this.restService.get(this.URL_NEW_KOMBIT, {}, id).pipe(
      map((response: UserResponse) => {
        return response;
      })
    );
  }
  updateNewKombit(body: CreateNewKombitUserDto): Observable<UserResponse> {
    return this.restService.put(
      this.URL_NEW_KOMBIT + '/createNewKombitUser',
      body,
      undefined,
      {
        observe: 'response',
      }
    );
  }

  updateUserOrgs(body: UpdateUserOrgsDto): Observable<void> {
    return this.restService.put(this.URL_NEW_KOMBIT + '/updateUserOrgs', body, undefined, {
      observe: 'response',
    });
  }

  rejectUser(body: RejectUserDto): Observable<Organisation> {
    return this.restService.put(this.URL + '/rejectUser', body, undefined, {
      observe: 'response',
    });
  }
}
