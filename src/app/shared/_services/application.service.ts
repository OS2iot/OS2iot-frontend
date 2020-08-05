import { Injectable } from '@angular/core';
import { Application } from 'src/app/models/application';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private restService: RestService) {}

    getApplication(id: number): Observable<Application> {
        return this.restService.get('application', {}, id);
    }
}
