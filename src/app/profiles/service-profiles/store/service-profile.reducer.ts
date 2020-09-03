import { ServiceProfile } from '../service-profile.model';
import * as ServiceProfileActions from './service-profile.actions';

export interface State {
    serviceProfiles: ServiceProfile[];
}

const initialState: State = {
    serviceProfiles: [{
        id: 'ID',
        name: 'Vandmåler',
        networkServerID: 'networkserverID',
        addGWMetaData: true,
        channelMask: 'channelmask',
        devStatusReqFreq: 789,
        dlBucketSize: 123,
        dlRate: 456,
        dlRatePolicy: 'dlRatePolicy',
        drMax: 789,
        drMin: 132,
        hrAllowed: true,
        minGWDiversity: 123,
        nwkGeoLoc: true,
        organizationID: 'organizationID',
        prAllowed: true,
        raAllowed: true,
        reportDevStatusBattery: true,
        reportDevStatusMargin: true,
        targetPER: 123,
        ulBucketSize: 456,
        ulRate: 789,
        ulRatePolicy: 'ulRatePolicy'
    }],
};

export function serviceProfileReducer(
    state = initialState,
    action: ServiceProfileActions.ServiceProfileActions
) {
    switch (action.type) {
        case ServiceProfileActions.SET_SERVICEPROFILES:
            return {
                ...state,
                serviceProfiles: [...action.payload],
            };
        case ServiceProfileActions.ADD_SERVICEPROFILE:
            return {
                ...state,
                serviceProfiles: [...state.serviceProfiles, action.payload]
            };
        case ServiceProfileActions.UPDATE_SERVICEPROFILE:
            const updatedRecipe = {
                ...state.serviceProfiles[action.payload.index],
                ...action.payload.updateServiceProfile
            };

            const updatedServiceProfiles = [...state.serviceProfiles];
            updatedServiceProfiles[action.payload.index] = updatedRecipe;

            return {
                ...state,
                serviceProfiles: updatedServiceProfiles
            };
        case ServiceProfileActions.DELETE_SERVICEPROFILE:
            return {
                ...state,
                serviceProfiles: state.serviceProfiles.filter((serviceProfile, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}
