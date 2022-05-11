import { BoundDirectivePropertyAst } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UserMinimalService } from '@app/admin/users/user-minimal.service';
import { RestService } from '@shared/services/rest.service';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceProfile, DeviceProfileRequest, DeviceProfileResponse, DeviceProfileResponseOne } from 'src/app/profiles/device-profiles/device-profile.model';


@Injectable({
  providedIn: 'root'
})
export class DeviceProfileService {
  URL = 'chirpstack/device-profiles';

  constructor(
    private restService: RestService,
    private sharedVariableService: SharedVariableService,
    private userMinimalService: UserMinimalService) { }

  post(body: DeviceProfile): Observable<DeviceProfileResponseOne> {
    const requestBody = new DeviceProfileRequest(body, this.sharedVariableService.getSelectedOrganisationId());
    return this.restService.post(this.URL, requestBody);
  }

  put(body: DeviceProfile): Observable<DeviceProfileResponseOne> {
    const requestBody = new DeviceProfileRequest(body);
    return this.restService.put(this.URL, requestBody, requestBody.deviceProfile.id, { observe: 'response' });
  }

  getOne(id: string): Observable<DeviceProfileResponseOne> {
    return this.restService.get(this.URL, {}, id).pipe(
      map(
        (response: DeviceProfileResponseOne) => {
          response.deviceProfile.internalOrganizationName = this.sharedVariableService.getOrganizationInfo()
            .find(org => org.id === response.deviceProfile.internalOrganizationId)?.name;
          response.deviceProfile.createdAt = response.createdAt;
          response.deviceProfile.updatedAt = response.updatedAt;
          response.deviceProfile.createdByName = this.userMinimalService.getUserNameFrom(response.deviceProfile.createdBy);
          response.deviceProfile.updatedByName = this.userMinimalService.getUserNameFrom(response.deviceProfile.updatedBy);
          return response;
        }
      )
    );
  }

  getMultiple(): Observable<DeviceProfileResponse> {
    return this.restService.get(this.URL);
  }

  delete(id: string) {
    return this.restService.delete(this.URL, id);
  }
}
