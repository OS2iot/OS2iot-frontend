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



@Injectable()
export class ServiceProfileEffects {
    restService: RestService;
    @Effect()
    fetchServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.FETCH_SERVICEPROFILES),
        switchMap((limit: number, offset: number): Observable<ServiceProfile[]> => {
            const body = {
                limit: limit,
                offset: offset,
            };
            return this.restService.get('chirpstack/service-profiles', body);

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
        })
    );

    @Effect({ dispatch: false })
    storeServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.STORE_SERVICEPROFILES),
        withLatestFrom(this.store.select('serviceProfiles')),
        switchMap((body: any): Observable<ServiceProfileData> => {
            return this.restService.post(
                'chirpstack/service-profiles',
                body,
                { observe: 'response' }
            );
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}
