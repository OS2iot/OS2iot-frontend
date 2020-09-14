import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as ServiceProfileActions from './payload-decoder.actions';
import * as fromApp from '../../store/app.reducer';
import * as PayloadDecoderActions from '../store/payload-decoder.actions';

import { RestService } from 'src/app/shared/services/rest.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PayloadDecoderResponse } from '../payload-decoder.model';


@Injectable()
export class PayloadDecoderEffects {

    @Effect()
    fetchpayloadDecoders = this.actions$.pipe(
        ofType(PayloadDecoderActions.FETCH_PAYLOADDECODER),
        switchMap((): Observable<PayloadDecoderResponse> => {
            /* const body = {
                limit: 10,
                offset: 0,
            }; */
            const result = this.restService.get(
                'payload-decoder');
            console.log(result);
            return result;
        }),
        map(payloadDecoders => {
            return payloadDecoders.data.map(payloadDecoder => {
                return {
                    ...payloadDecoder,
                };
            });
        }),
        map(payloadDecoders => {
            return new PayloadDecoderActions.SetPayloadDecoders(payloadDecoders);
        }),
        catchError(() => of({ type: ' Loaded Error' }))
    );

    @Effect()
    postPayloadDecoders = this.actions$.pipe(
        ofType(PayloadDecoderActions.ADD_PAYLOADDECODER),
        switchMap((payloadDecoderState): Observable<any> => {
            const result = this.restService.post(
                'payload-decoder',
                {});
            console.log(result);
            return result;
        }),
        map(payloadDecoders => {
            return payloadDecoders.data.map(payloadDecoder => {
                return {
                    ...payloadDecoder,
                };
            });
        }),
        map(payloadDecoders => {
            return new PayloadDecoderActions.SetPayloadDecoders(payloadDecoders);
        }),
        catchError(() => of({ type: ' Loaded Error' }))
    );

    @Effect({ dispatch: false })
    storeServiceProfiles = this.actions$.pipe(
        ofType(ServiceProfileActions.STORE_PAYLOADDECODERS),
        withLatestFrom(this.store.select('serviceProfiles')),
        switchMap(([payloadDecoderState]): Observable<PayloadDecoderResponse> => {
            const result = this.restService.post(
                'payload-decoder',
                {},
                { observe: 'response' }
            );
            console.log(result);
            return result;
        })
    );

    constructor(
        private restService: RestService,
        private actions$: Actions,
        private store: Store<fromApp.AppState>
    ) { }
}
