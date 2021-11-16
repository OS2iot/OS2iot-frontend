import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Multicast, MulticastData } from './multicast.model';

@Injectable({
  providedIn: 'root',
})
export class MulticastService {
  constructor(private restService: RestService) {}

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
      map((response: Multicast) => {
        return response;
      })
    );
  }
  delete(id: number) {
    return this.restService.delete(this.multicastURL, id);
  }
  update(multicast: Multicast): Observable<Multicast> {
    return this.restService.put(this.multicastURL, multicast, multicast.id, {
      observe: 'response',
    });
  }
  create(multicast: Multicast): Observable<Multicast> {
    return this.restService.post(this.multicastURL, multicast, {
      observe: 'response',
    });
  }
}
