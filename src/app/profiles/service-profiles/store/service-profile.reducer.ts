import { Action, createReducer, on } from '@ngrx/store';
import * as ServiceProfilesActions from './service-profile.actions';
import { ServiceProfile } from '../service-profile.model';


export interface State {
    serviceProfiles: ServiceProfile[];
}


const initialState: State = {
    serviceProfiles: []
};


const _serviceProfileReducer = createReducer(

    initialState,

    on(
        ServiceProfilesActions.addServiceProfile,
        (state, action) => ({
            ...state,
            serviceProfiles: state.serviceProfiles.concat({ ...action.serviceProfile })
        })
    ),

    on(
        ServiceProfilesActions.updateServiceProfile,
        (state, action) => ({
            ...state,
            serviceProfiles: state.serviceProfiles.map(
                (serviceProfile, index) => index === action.index ? { ...action.serviceProfile } : serviceProfile
            )
        })
    ),

    on(
        ServiceProfilesActions.deleteServiceProfile,
        (state, action) => ({
            ...state,
            serviceProfiles: state.serviceProfiles.filter(
                (_, index) => index !== action.index
            )
        })
    ),

    on(
        ServiceProfilesActions.setServiceProfiles,
        (state, action) => ({
            ...state,
            serviceProfiles: [...action.serviceProfiles]
        })
    )

);


export function serviceProfileReducer(state: State, action: Action) {
    return _serviceProfileReducer(state, action);
}
