import { BoundDirectivePropertyAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable } from 'rxjs';
import { DeviceProfile, DeviceProfileRequest, DeviceProfileResponse } from 'src/app/profiles/device-profiles/device-profile.model';


@Injectable({
    providedIn: 'root'
})
export class DeviceProfileService {
    URL = 'chirpstack/device-profiles';

    constructor(private restService: RestService, private sharedVariableService: SharedVariableService) { }

    post(body: DeviceProfile): Observable<DeviceProfileRequest> {
        const requestBody = new DeviceProfileRequest(body, this.sharedVariableService.getSelectedOrganisationId());
        return this.restService.post(this.URL, requestBody);
    }

    put(body: DeviceProfile): Observable<any> {
        const requestBody = new DeviceProfileRequest(body);
        return this.restService.put(this.URL, requestBody, requestBody.deviceProfile.id, { observe: 'response' });
    }

    getOne(id: string): Observable<any> {
        return this.restService.get(this.URL, {}, id);
    }

    getMultiple(): Observable<DeviceProfileResponse> {
        return this.restService.get(this.URL);
    }

    delete(id: string) {
        return this.restService.delete(this.URL, id);
    }
}
