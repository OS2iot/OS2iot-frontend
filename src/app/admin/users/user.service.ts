import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserMinimalService } from './user-minimal.service';
import { UserResponse, UserRequest, UserGetManyResponse } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    URL = 'user';

    constructor(
        private restService: RestService, 
        private userMinimalService: UserMinimalService) { }
        

    post(body: UserRequest): Observable<UserResponse> {
        return this.restService.post(this.URL, body);
    }

    put(body: UserRequest, id: number): Observable<UserResponse> {
        return this.restService.put(this.URL, body, id, { observe: 'response' });
    }

    getOne(id: number, extendedInfo = false): Observable<UserResponse> {
        return this.restService.get(this.URL, { extendedInfo: extendedInfo }, id)
            .pipe(
                map(
                    (response: UserResponse) => {
                        response.createdByName = this.userMinimalService.getUserNameFrom(response.createdBy);
                        response.updatedByName = this.userMinimalService.getUserNameFrom(response.updatedBy);
                        return response
                    }
                )
            );
    }

    getMultiple(): Observable<UserGetManyResponse> {
        return this.restService.get(this.URL);
    }

}
