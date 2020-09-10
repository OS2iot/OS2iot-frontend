import * as ServiceProfileActions from './service-profile.actions';
import * as fromApp from '@store/app.reducer';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ServiceProfileData } from '../service-profile.model';
import { RestService } from '@shared/services/rest.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';



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
