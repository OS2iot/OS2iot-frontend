import { Injectable } from '@angular/core';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MulticastResponse } from './multicast-response.model';
import { Multicast, MulticastData } from './multicast.model';

@Injectable({
  providedIn: 'root',
})
export class MulticastService {
  constructor(
    private restService: RestService,
    private userMinimalService: UserMinimalService
  ) {}

  private multicastURL = 'multicast';
  getByApplicationId(
    limit: number,
    offset: number,
    applicationId: number
  ): Observable<MulticastData> {
    const body = {
      limit,
      offset,
      applicationId,
      // sort: sort,
      // orderOn: orderOn,
      // todo tilføj når iot-314 er tilføjet
    };
    return this.restService.get(this.multicastURL, body);
  }
  get(id: number): Observable<Multicast> {
    return this.restService.get(this.multicastURL, {}, id).pipe(
      map(
        (response: MulticastResponse) => {
          const datatarget = this.mapToMulticast(response);
          return datatarget;
        }
      )
    );
  }
  delete(id: number) {
    return this.restService.delete(this.multicastURL, id);
  }
  update(multicast: Multicast): Observable<Multicast> {
    return this.restService.put(this.multicastURL, multicast, multicast.id, { observe: 'response' }).pipe(
      map(
        (response: MulticastResponse) => {
          const datatarget = this.mapToMulticast(response);
          return datatarget;
        }
      )
    );
  }
  create(multicast: Multicast): Observable<Multicast> {
    return this.restService.post(this.multicastURL, multicast).pipe(
      map(
        (response: MulticastResponse) => {
          const multicast = this.mapToMulticast(response);
          return multicast;
        }
      )
    );
  }

  private mapToMulticast(multicastResponse: MulticastResponse): Multicast {
    const model: Multicast = {
      id: multicastResponse.id,
      groupName: multicastResponse.groupName,
      groupType: multicastResponse.groupType,
      address: multicastResponse.address,
      applicationSessionKey: multicastResponse.applicationSessionKey,
      dataRate: multicastResponse.dataRate,
      frameCounter: multicastResponse.frameCounter,
      frequency: multicastResponse.frequency,
      networkSessionKey: multicastResponse.networkSessionKey,
      applicationId: multicastResponse.application.id,
      createdAt: multicastResponse.createdAt,
      updatedAt: multicastResponse.updatedAt,
      createdBy: multicastResponse.createdBy,
      updatedBy: multicastResponse.updatedBy,
      createdByName: this.userMinimalService.getUserNameFrom(
        multicastResponse.createdBy
      ),
      updatedByName: this.userMinimalService.getUserNameFrom(
        multicastResponse.updatedBy
      ),
    };
    return model;
  }
}
