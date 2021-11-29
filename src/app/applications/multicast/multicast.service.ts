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

  private multicastURL = 'multicast'; // api endpoint
  getMulticastsByApplicationId(
    limit: number,
    offset: number,
    applicationId: number
  ): Observable<MulticastData> {
    const body = {
      limit,
      offset,
      applicationId,
    };
    return this.restService.get(this.multicastURL, body); // get's the multicasts from specific application by the url and the body with applicationId.
  }
  get(id: number): Observable<Multicast> {
    // Get's a single multicast by id.
    return this.restService.get(this.multicastURL, {}, id).pipe(
      map((response: MulticastResponse) => {
        const multicast = this.mapToMulticast(response); // maps the response from backend.
        return multicast;
      })
    );
  }
  delete(id: number) {
    // deletes a chosen multicast by id
    return this.restService.delete(this.multicastURL, id);
  }
  update(multicast: Multicast): Observable<Multicast> {
    // updates the chosen multicast by id
    return this.restService
      .put(this.multicastURL, multicast, multicast.id)
      .pipe(
        map((response: MulticastResponse) => {
          const multicast = this.mapToMulticast(response);
          return multicast;
        })
      );
  }
  create(multicast: Multicast): Observable<Multicast> {
    // creates a new multicast
    return this.restService.post(this.multicastURL, multicast).pipe(
      map((response: MulticastResponse) => {
        const multicast = this.mapToMulticast(response);
        return multicast;
      })
    );
  }

  private mapToMulticast(multicastResponse: MulticastResponse): Multicast {
    const model: Multicast = {
      id: multicastResponse.id,
      name: multicastResponse.groupName,
      groupType: multicastResponse.lorawanMulticastDefinition.groupType,
      mcAddr: multicastResponse.lorawanMulticastDefinition.address,
      mcAppSKey:
        multicastResponse.lorawanMulticastDefinition.applicationSessionKey,
      dr: multicastResponse.lorawanMulticastDefinition.dataRate,
      fCnt: multicastResponse.lorawanMulticastDefinition.frameCounter,
      frequency: multicastResponse.lorawanMulticastDefinition.frequency,
      mcNwkSKey: multicastResponse.lorawanMulticastDefinition.networkSessionKey,
      applicationID: multicastResponse.application.id,
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
