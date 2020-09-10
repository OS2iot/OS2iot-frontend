import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromServiceProfiles from '../profiles/service-profiles/store/service-profile.reducer';
import * as fromPayloadDecoders from '../payload-decoder/store/payload-decoder.reducer';
import { environment } from 'src/environments/environment';

export interface AppState {
    serviceProfiles: fromServiceProfiles.State;
    payloadDecoders: fromPayloadDecoders.State;
    router: RouterReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
    serviceProfiles: fromServiceProfiles.serviceProfileReducer,
    payloadDecoders: fromPayloadDecoders.payloadDecoderReducer,
    router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [storeFreeze] : [];
