import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromServiceProfiles from '../profiles/service-profiles/store/service-profile.reducer';
import * as fromDeviceProfiles from '../profiles/device-profiles/store/device-profile.reducer';
import { environment } from 'src/environments/environment';

export interface AppState {
    deviceProfiles: fromDeviceProfiles.State;
    router: RouterReducerState;
    serviceProfiles: fromServiceProfiles.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    deviceProfiles: fromDeviceProfiles.deviceProfileReducer,
    router: routerReducer,
    serviceProfiles: fromServiceProfiles.serviceProfileReducer,
};

export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [storeFreeze] : [];
