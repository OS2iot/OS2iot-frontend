import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ServiceProfileData, ServiceProfile } from './service-profile.model';
import { RestService } from 'src/app/shared/services/rest.service';


@Injectable()
export class ServiceProfileService {

    serviceProfileChanged = new Subject<ServiceProfile[]>();


    constructor(private restService: RestService) { }

    createServiceProfile(body: any): Observable<ServiceProfileData> {
        return this.restService.post('chirpstack/service-profiles', body, { observe: 'response' });
    }

    updateServiceProfile(body: any, id: number): Observable<ServiceProfileData> {
        return this.restService.replace('chirpstack/service-profiles', body, id, { observe: 'response' });
    }

    getServiceProfile(id: number): Observable<ServiceProfile> {
        return this.restService.get('chirpstack/service-profiles', {}, id);
    }

    getServiceProfiles(
        limit: number,
        offset: number,
    ): Observable<ServiceProfileData> {
        const body = {
            limit: limit,
            offset: offset,
        };
        return this.restService.get('chirpstack/service-profiles', body);
    }

    deleteServiceProfile(id: number) {
        return this.restService.delete('chirpstack/service-profiles', id);
    }
}