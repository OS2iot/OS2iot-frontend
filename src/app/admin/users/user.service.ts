import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { UserResponse, User } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    URL = 'user';

    constructor(private restService: RestService) { }


    post(body: User): Observable<UserResponse> {
        return this.restService.post(this.URL, body);
    }

    put(body: User, id: number): Observable<User> {
        return this.restService.put(this.URL, body, id, { observe: 'response' });
    }

    getOne(id: number): Observable<User> {
        return this.restService.get(this.URL, {}, id);
    }

    getMultiple(): Observable<UserResponse> {
        return this.restService.get(this.URL);
    }

    delete(id: number) {
        return this.restService.delete(this.URL, id);
    }
}
