import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { ServiceProfile, ServiceProfileRequest, ServiceProfileResponseMany, ServiceProfileResponseOne } from 'src/app/profiles/service-profiles/service-profile.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceProfileService {
  URL = 'chirpstack/service-profiles';

  constructor(private restService: RestService) { }

  post(serviceProfile: ServiceProfile): Observable<any> {
    const requestBody = new ServiceProfileRequest(serviceProfile);
    return this.restService.post(this.URL, requestBody);
  }

  put(serviceProfile: ServiceProfile): Observable<any> {
    const requestBody = new ServiceProfileRequest(serviceProfile);
    return this.restService.put(this.URL, requestBody, serviceProfile.id, { observe: 'response' });
  }

  getOne(id: string): Observable<ServiceProfileResponseOne> {
    return this.restService.get(this.URL, {}, id);
  }

  getMultiple(): Observable<ServiceProfileResponseMany> {
    return this.restService.get(this.URL);
  }

  delete(id: string): Observable<any> {
    return this.restService.delete(this.URL, id);
  }
}
