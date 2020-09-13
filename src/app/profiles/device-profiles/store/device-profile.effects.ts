import * as DeviceProfilesActions from './device-profile.actions';
import * as fromApp from '@store/app.reducer';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DeviceProfileData, DeviceProfile } from '../device-profile.model';

import { Store, Action } from '@ngrx/store';
import { RestService } from '@shared/services/rest.service';


export class EffectError implements Action {
    readonly type = '[Error] Effect Error';
}

@Injectable()
export class DeviceProfileEffects {

    fetchDeviceProfiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceProfilesActions.fetchDeviceProfiles),
            switchMap((): Observable<DeviceProfileData> => {
                const body = {
                    limit: 10,
                    offset: 0,
                };
                const result = this.restService.get(
                    'chirpstack/device-profiles', body);
                console.log(result);
                return result;
            }),
            map(deviceProfiles => {
                return deviceProfiles.result.map(deviceProfile => {
                    return {
                        ...deviceProfile,
                    };
                });
            }),
            map(deviceProfiles => {
                return DeviceProfilesActions.setDeviceProfiles({ deviceProfiles });
            }),

        )
    );


    storeDeviceProfiles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeviceProfilesActions.addDeviceProfile),
            withLatestFrom(this.store.select('deviceProfiles')),
            switchMap(([actionData, deviceProfilesState]): Observable<DeviceProfile> => {
                const result = this.restService.create(
                    'chirpstack/device-profiles',
                    deviceProfilesState.deviceProfiles
                );
                console.log('add deviceprofile to chripstack: ' + result);
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
