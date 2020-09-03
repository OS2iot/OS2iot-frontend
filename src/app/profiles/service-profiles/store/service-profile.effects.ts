import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as ServiceProfileActions from './service-profile.actions';
import { ServiceProfile } from '../service-profile.model';
import * as fromApp from '../../../store/app.reducer';

import { environment } from 'src/environments/environment';
import { RestService } from 'src/app/shared/services/rest.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ServiceProfileEffects {
    restService: RestService;
    @Effect()
    fetchServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.FETCH_SERVICEPROFILES),
        switchMap(() => {
            return this.http.get<ServiceProfile[]>(
                'http://[::1]:3000/api/v1/chirpstack/service-profiles?limit=100&offset=0'
            );
        }),
        map(serviceProfiles => {
            return serviceProfiles.map(serviceProfile => {
                return {
                    ...serviceProfile,
                };
            });
        }),
        map(serviceProfiles => {
            return new ServiceProfileActions.SetServiceProfiles(serviceProfiles);
        }),
        catchError(() => of({ type: ' Loaded Error' }))
    );

    @Effect({ dispatch: false })
    storeServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.STORE_SERVICEPROFILES),
        withLatestFrom(this.store.select('serviceProfiles')),
        switchMap(([actionData, serviceProfileState]) => {
            return this.http.post(
                'http://[::1]:3000/api/v1/chirpstack/service-profiles',
                serviceProfileState.serviceProfiles
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}
