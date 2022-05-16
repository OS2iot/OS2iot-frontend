import { Injectable } from '@angular/core';
import { RestService } from '@shared/services/rest.service';
import { Observable } from 'rxjs';
import { UserMinimal, UserMinimalResponse } from './user-minimal.model';

@Injectable({
    providedIn: 'root',
})
export class UserMinimalService {

    URL = 'user/minimal';
    private userMinimalList: UserMinimal[];

    constructor(
        private restService: RestService) { }

    getUserMinimalRest(): Observable<UserMinimalResponse> {
        return this.restService.get(this.URL);
    }

    setUserMinimalList() {
        return this.getUserMinimalRest().subscribe(
            (response: UserMinimalResponse) => {
                localStorage.setItem(
                    'userMinimalList',
                    JSON.stringify(response.users)
                );
                this.userMinimalList = response.users;
            }
        );
    }

    private getUserMinimalList(): UserMinimal[] {
        if (this.userMinimalList) {
            return this.userMinimalList;
        }
        return new Object(JSON.parse(localStorage.getItem('userMinimalList'))) as UserMinimal[];
    }

    getUserNameFrom(id: number): string {
        const username = this.getUserMinimalList().find(
            user => user.id === id
        )?.name;
        return username;
    }

    setHasSeenWelcomeScreen(): void {
      localStorage.setItem('hasSeenWelcomeScreen', true.toString());
    }

    getHasSeenWelcomeScreen(): boolean {
      return !!localStorage.getItem('hasSeenWelcomeScreen');
    }
}
