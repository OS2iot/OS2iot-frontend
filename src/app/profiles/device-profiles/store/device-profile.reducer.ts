import { Action, createReducer, on } from '@ngrx/store';
import * as DeviceProfilesActions from './device-profile.actions';
import { DeviceProfile } from '../device-profile.model';


export interface State {
    deviceProfiles: DeviceProfile[];
}


const initialState: State = {
    deviceProfiles: []
};


const _deviceProfileReducer = createReducer(

    initialState,

    on(
        DeviceProfilesActions.addDeviceProfile,
        (state, action) => ({
            ...state,
            deviceProfiles: state.deviceProfiles.concat({ ...action.deviceProfile })
        })
    ),

    on(
        DeviceProfilesActions.updateDeviceProfile,
        (state, action) => ({
            ...state,
            deviceProfiles: state.deviceProfiles.map(
                (deviceProfile, index) => index === action.index ? { ...action.deviceProfile } : deviceProfile
            )
        })
    ),

    on(
        DeviceProfilesActions.deleteDeviceProfile,
        (state, action) => ({
            ...state,
            deviceProfiles: state.deviceProfiles.filter(
                (_, index) => index !== action.index
            )
        })
    ),

    on(
        DeviceProfilesActions.setDeviceProfiles,
        (state, action) => ({
            ...state,
            deviceProfiles: [...action.deviceProfiles]
        })
    )

);


export function deviceProfileReducer(state: State, action: Action) {
    return _deviceProfileReducer(state, action);
}
