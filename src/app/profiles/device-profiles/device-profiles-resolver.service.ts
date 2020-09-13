

import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { DeviceProfile } from './device-profile.model';
import * as fromApp from '@store/app.reducer';
import * as DeviceProfilesActions from '../device-profiles/store/device-profile.actions';

@Injectable({ providedIn: 'root' })
export class DeviceProfilesResolverService implements Resolve<{ deviceProfiles: DeviceProfile[] }> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select('deviceProfiles').pipe(
            take(1),
            map(deviceProfilesState => {
                return deviceProfilesState.deviceProfiles;
            }),
            switchMap(deviceProfiles => {
                if (deviceProfiles.length === 0) {
                    this.store.dispatch(DeviceProfilesActions.fetchDeviceProfiles());
                    return this.actions$.pipe(
                        ofType(DeviceProfilesActions.setDeviceProfiles),
                        take(1)
                    );
                } else {
                    return of({ deviceProfiles });
                }
            })
        );
    }
}
