import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { UserResponse, User, UserRequest, UsersResponse } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    URL = 'user';

    constructor(private restService: RestService) { }


    post(user: User): Observable<any> {
        const requestBody = new UserRequest(user);
        return this.restService.post(this.URL, requestBody);
    }

    put(user: User): Observable<any> {
        const requestBody = new UserRequest(user);
        return this.restService.put(this.URL, requestBody, user.id, { observe: 'response' });
    }

    getOne(id: string): Observable<UserResponse> {
        return this.restService.get(this.URL, {}, id);
    }

    getMultiple(): Observable<UsersResponse> {
        return this.restService.get(this.URL);
    }

    delete(id: string): Observable<any> {
        return this.restService.delete(this.URL, id);
    }
}
