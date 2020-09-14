import * as ServiceProfilesActions from './service-profile.actions';
import * as fromApp from '@store/app.reducer';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ServiceProfileData, ServiceProfile } from '../service-profile.model';
import { RestService } from '@shared/services/rest.service';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';


export class EffectError implements Action {
    readonly type = '[Error] Effect Error';
}

@Injectable()
export class ServiceProfileEffects {

    fetchServiceProfiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ServiceProfilesActions.fetchServiceProfiles),
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
                return ServiceProfilesActions.setServiceProfiles({ serviceProfiles });
            }),

        )
    );


    storeServiceProfiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ServiceProfilesActions.addServiceProfile),
            withLatestFrom(this.store.select('serviceProfiles')),
            switchMap(([actionData, serviceProfilesState]): Observable<ServiceProfile> => {
                const result = this.restService.create(
                    'chirpstack/service-profiles',
                    serviceProfilesState.serviceProfiles
                );
                console.log('add serviceprofile to chripstack: ' + result);
                return result;
            }),
            catchError(() => of(new EffectError()))

        ),
        { dispatch: false }
    );

    constructor(
        private restService: RestService,
        private actions$: Actions,
        private store: Store<fromApp.AppState>
    ) { }
}
