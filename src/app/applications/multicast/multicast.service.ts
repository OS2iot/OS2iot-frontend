import { Injectable } from '@angular/core';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { Downlink } from '@applications/iot-devices/downlink.model';
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
  private multicastDownlinkURL = 'multicast/';
  private DOWNLINKMULTICASTURL = 'downlink-multicast';

  getMulticastsByApplicationId(
    limit: number,
    offset: number,
    sort: string,
    orderOn: string,
    applicationId: number
  ): Observable<MulticastData> {
    const body = {
      limit,
      offset,
      sort,
      orderOn,
      applicationId,
    };
    return this.restService.get(this.multicastURL, body);
  }

  get(id: number): Observable<Multicast> {
    return this.restService.get(this.multicastURL, {}, id).pipe(
      // bind "this" correctly by creating a new lambda function
      map((response: MulticastResponse) => {
        const multicast = this.mapToMulticast(response);
        return multicast;
      })
    );
  }

  delete(id: number) {
    return this.restService.delete(this.multicastURL, id);
  }
  update(multicast: Multicast): Observable<Multicast> {
    return this.restService.put(this.multicastURL, multicast, multicast.id);
  }
  create(multicast: Multicast): Observable<Multicast> {
    return this.restService.post(this.multicastURL, multicast);
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
      iotDevices: multicastResponse.iotDevices,
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

  public multicastGet(multicastId: number, params = {}): Observable<unknown> {
    const url =
      this.multicastDownlinkURL + multicastId + '/' + this.DOWNLINKMULTICASTURL;
    return this.restService.get(url, params);
  }
  public multicastPost(
    downlink: Downlink,
    multicastId: number,
    params = {}
  ): Observable<unknown> {
    const url =
      this.multicastDownlinkURL + multicastId + '/' + this.DOWNLINKMULTICASTURL;
    return this.restService.post(url, downlink, params);
  }
}
