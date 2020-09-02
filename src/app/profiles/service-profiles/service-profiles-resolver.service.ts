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
import * as ServiceProfileActions from './store/service-profile.actions';
import { LoggingService } from 'src/app/logging.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<ServiceProfile[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
        private loggingService: LoggingService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('serviceProfiles').pipe(
            take(1),
            map(serviceProfileState => {
                return serviceProfileState.serviceProfiles;
            }),
            switchMap(serviceProfiles => {
                if (serviceProfiles.length === 0) {
                    this.store.dispatch(ServiceProfileActions.fetchServiceProfiles());
                    return this.actions$.pipe(
                        ofType(ServiceProfileActions.setServiceProfiles),
                        take(1)
                    );
                } else {
                    return of(serviceProfiles);
                }
            })
        );
    }
}
