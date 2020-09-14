import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceProfile } from 'src/app/profiles/device-profiles/device-profile.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceProfileService {
  URL = 'chirpstack/device-profiles';

    constructor(private restService: RestService) { }

    post(body: DeviceProfile): Observable<any> {
        return this.restService.post(this.URL, body);
    }

    put(body: DeviceProfile, id: string): Observable<any> {
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
