import { Action } from '@ngrx/store';
import { ServiceProfile } from '../service-profile.model';


export const SET_SERVICEPROFILES = '[Service Profile] Set Service Profiles';
export const FETCH_SERVICEPROFILES = '[Service Profile] Fetch Service Profiles';
export const ADD_SERVICEPROFILE = '[Service Profile] Add Service Profile';
export const UPDATE_SERVICEPROFILE = '[Service Profile] Update Service Profile';
export const DELETE_SERVICEPROFILE = '[Service Profile] Delete Service Profile';
export const STORE_SERVICEPROFILES = '[Service Profile] Store Service Profiles';

export class SetServiceProfiles implements Action {
    readonly type = SET_SERVICEPROFILES;

    constructor(public payload: ServiceProfile[]) { }
}

export class FetchServiceProfiles implements Action {
    readonly type = FETCH_SERVICEPROFILES;
}

export class AddServiceProfile implements Action {
    readonly type = ADD_SERVICEPROFILE;

    constructor(public payload: ServiceProfile) { }
}

export class UpdateServiceProfile implements Action {
    readonly type = UPDATE_SERVICEPROFILE;

    constructor(public payload: { index: number; updateServiceProfile: ServiceProfile }) { }
}

export class DeleteServiceProfile implements Action {
    readonly type = DELETE_SERVICEPROFILE;

    constructor(public payload: number) { }
}

export class StoreServiceProfiles implements Action {
    readonly type = STORE_SERVICEPROFILES;
}

export type ServiceProfileActions =
    | SetServiceProfiles
    | FetchServiceProfiles
    | AddServiceProfile
    | UpdateServiceProfile
    | DeleteServiceProfile
    | StoreServiceProfiles;
