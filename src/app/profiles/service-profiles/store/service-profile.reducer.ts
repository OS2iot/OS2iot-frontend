// import { ServiceProfile } from '../service-profile.model';
// import * as ServiceProfileActions from './service-profile.actions';

// export interface State {
//     serviceProfiles: ServiceProfile[];
// }

// const initialState: State = {
//     serviceProfiles: [{
//         id: 'ID',
//         name: 'Vandmåler',
//         networkServerID: 'networkserverID',
//         addGWMetaData: true,
//         channelMask: 'channelmask',
//         devStatusReqFreq: 789,
//         dlBucketSize: 123,
//         dlRate: 456,
//         dlRatePolicy: 'dlRatePolicy',
//         drMax: 789,
//         drMin: 132,
//         hrAllowed: true,
//         minGWDiversity: 123,
//         nwkGeoLoc: true,
//         organizationID: 'organizationID',
//         prAllowed: true,
//         raAllowed: true,
//         reportDevStatusBattery: true,
//         reportDevStatusMargin: true,
//         targetPER: 123,
//         ulBucketSize: 456,
//         ulRate: 789,
//         ulRatePolicy: 'ulRatePolicy'
//     }],
// };

// export function serviceProfileReducer(
//     state = initialState,
//     action: ServiceProfileActions.ServiceProfileActions
// ) {
//     switch (action.type) {
//         case ServiceProfileActions.SET_SERVICEPROFILES:
//             return {
//                 ...state,
//                 serviceProfiles: [...action.payload],
//             };
//         case ServiceProfileActions.ADD_SERVICEPROFILE:
//             return {
//                 ...state,
//                 serviceProfiles: [...state.serviceProfiles, action.payload]
//             };
//         case ServiceProfileActions.UPDATE_SERVICEPROFILE:
//             const updatedServiceProfile = {
//                 ...state.serviceProfiles[action.payload.index],
//                 ...action.payload.updateServiceProfile
//             };
//             const updatedServiceProfiles = [...state.serviceProfiles];
//             updatedServiceProfiles[action.payload.index] = updatedServiceProfile;

//             return {
//                 ...state,
//                 serviceProfiles: updatedServiceProfiles
//             };
//         case ServiceProfileActions.DELETE_SERVICEPROFILE:
//             return {
//                 ...state,
//                 serviceProfiles: state.serviceProfiles.filter((serviceProfile, index) => {
//                     return index !== action.payload;
//                 })
//             };
//         default:
//             return state;
//     }
// }


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
