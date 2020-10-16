import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { UserResponse, UserRequest, UserGetManyResponse } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    URL = 'user';

    constructor(private restService: RestService) { }


    post(body: UserRequest): Observable<UserResponse> {
        return this.restService.post(this.URL, body);
    }

    put(body: UserRequest, id: number): Observable<UserResponse> {
        return this.restService.put(this.URL, body, id, { observe: 'response' });
    }

    getOne(id: number, extendedInfo = false): Observable<UserResponse> {
        return this.restService.get(this.URL, { extendedInfo: extendedInfo }, id);
    }

    getMultiple(): Observable<UserGetManyResponse> {
        return this.restService.get(this.URL);
    }

}
