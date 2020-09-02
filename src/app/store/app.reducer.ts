import { ActionReducerMap } from '@ngrx/store';

import * as fromServiceProfiles from '../profiles/service-profiles/store/service-profile.reducer';

export interface AppState {
    serviceProfiles: fromServiceProfiles.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    serviceProfiles: fromServiceProfiles.serviceProfileReducer,
};
