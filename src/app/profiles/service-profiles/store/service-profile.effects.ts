import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as ServiceProfileActions from './service-profile.actions';
import { ServiceProfile, ServiceProfileData } from '../service-profile.model';
import * as fromApp from '../../../store/app.reducer';

import { environment } from 'src/environments/environment';
import { RestService } from 'src/app/shared/services/rest.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ServiceProfileEffects {

    @Effect()
    fetchServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.FETCH_SERVICEPROFILES),
        switchMap((): Observable<ServiceProfileData> => {
            const body = {
                limit: 10,
                offset: 0,
            };
            const result = this.restService.get(
                'chirpstack/service-profiles', body);
            console.log(result);
            return result;
        }),
        map(serviceProfiles => {
            return serviceProfiles.result.map(serviceProfile => {
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
        switchMap(([actionData, serviceProfileState]): Observable<ServiceProfileData> => {
            const result = this.restService.post(
                'chirpstack/service-profiles',
                serviceProfileState.serviceProfiles,
                { observe: 'response' }
            );
            console.log(result)
            return result
        })
    );

    constructor(
        private restService: RestService,
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}
