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

import { ServiceProfile } from './service-profile.model';
import * as fromApp from '../../store/app.reducer';
import * as ServiceProfilesActions from '../service-profiles/store/service-profile.actions';

@Injectable({ providedIn: 'root' })
export class ServiceProfilesResolverService implements Resolve<{ serviceProfiles: ServiceProfile[] }> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select('serviceProfiles').pipe(
            take(1),
            map(serviceProfilesState => {
                return serviceProfilesState.serviceProfiles;
            }),
            switchMap(serviceProfiles => {
                if (serviceProfiles.length === 0) {
                    this.store.dispatch(ServiceProfilesActions.fetchServiceProfiles());
                    return this.actions$.pipe(
                        ofType(ServiceProfilesActions.setServiceProfiles),
                        take(1)
                    );
                } else {
                    return of({ serviceProfiles });
                }
            })
        );
    }
}