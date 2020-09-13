import { DeviceProfile } from '../device-profile.model';
import { createAction, props } from '@ngrx/store';


export const addDeviceProfile = createAction(
    '[DeviceProfile] Add DeviceProfile',
    props<{
        deviceProfile: DeviceProfile
    }>()
);


export const updateDeviceProfile = createAction(
    '[DeviceProfile] Update DeviceProfile',
    props<{
        index: number,
        deviceProfile: DeviceProfile
    }>()
);


export const deleteDeviceProfile = createAction(
    '[DeviceProfile] Delete DeviceProfile',
    props<{
        index: number
    }>()
);


export const setDeviceProfiles = createAction(
    '[DeviceProfile] Set DeviceProfiles',
    props<{
        deviceProfiles: DeviceProfile[]
    }>()
);


export const fetchDeviceProfiles = createAction(
    '[DeviceProfile] Fetch DeviceProfiles'
);


export const storeDeviceProfiles = createAction(
    '[DeviceProfile] Store DeviceProfiles'
);
