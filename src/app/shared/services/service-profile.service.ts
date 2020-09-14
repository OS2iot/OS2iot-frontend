import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProfile } from 'src/app/profiles/service-profiles/service-profile.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfileService {
  URL = 'chirpstack/service-profiles';

  constructor(private restService: RestService) { }

  post(body: ServiceProfile): Observable<any> {
      return this.restService.post(this.URL, body);
  }

  put(body: ServiceProfile, id: string): Observable<any> {
      return this.restService.replace(this.URL, body, id, { observe: 'response' });
  }

  getOne(id: string): Observable<any> {
      return this.restService.get(this.URL, {}, id);
  }

  getMultiple(): Observable<any> {
      return this.restService.get(this.URL);
  }

  delete(id: string) {
      return this.restService.delete(this.URL, id);
  }
}
