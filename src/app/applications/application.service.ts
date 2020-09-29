import { Injectable } from '@angular/core';
import { Application, ApplicationData } from '@applications/application.model';
import { RestService } from '../shared/services/rest.service';
import { Observable } from 'rxjs';
import { SortDir, SortCol } from '@shared/models/sort.model';


interface GetApplicationParameters {
    limit: number;
    offset: number;
    sort: SortDir;
    orderOn: SortCol;
    organizationId?: number;
}

@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private restService: RestService) { }

    createApplication(body: any): Observable<ApplicationData> {

        return this.restService.post('application', body, { observe: 'response' });
    }

    updateApplication(body: any, id: number): Observable<ApplicationData> {
        return this.restService.put('application', body, id, { observe: 'response' });
    }

    getApplication(id: number): Observable<Application> {
        return this.restService.get('application', {}, id);
    }

    getApplications(
        limit: number,
        offset: number,
        sort: SortDir,
        orderOn: SortCol,
        organizationId?: number
    ): Observable<ApplicationData> {
        const body: GetApplicationParameters = {
            limit: limit,
            offset: offset,
            sort: sort,
            orderOn: orderOn,
        };
        body.organizationId = organizationId
        return this.restService.get('application', body);
    }

    getApplicationsByOrganizationId(organizationId: number): Observable<ApplicationData> {
        const body = {
            organizationId: organizationId
        };
        return this.restService.get('application', body);

    }

    deleteApplication(id: number) {
        return this.restService.delete('application', id);
    }
}
