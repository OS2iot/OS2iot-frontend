
import * as fromApp from '../store/app.reducer';
import * as PayloadDecoderActions from './store/payload-decoder.actions';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PayloadDecoder } from './payload-decoder.model';

@Injectable({ providedIn: 'root' })
export class PayloadDecoderResolverService implements Resolve<PayloadDecoder[]> {
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('payloadDecoders').pipe(
            take(1),
            map(payloadDecoderState => {
                return payloadDecoderState.payloadDecoders;
            }),
            switchMap(payloadDecoders => {
                if (payloadDecoders.length === 0) {
                    this.store.dispatch(new PayloadDecoderActions.FetchPayloadDecoders());
                    return this.actions$.pipe(
                        ofType(PayloadDecoderActions.SET_PAYLOADDECODERS),
                        take(1)
                    );
                } else {
                    return of(payloadDecoders);
                }
            })
        );
    }
}
