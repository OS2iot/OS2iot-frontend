import { OrganisationResponse } from "../organisation/organisation.model";
import { UserResponse } from "../users/user.model";
import { Application } from "../../applications/application.model";

export class PermissionRequest {
    levels: PermissionTypes[];
    name: string;
    organizationId: number;
    userIds: number[];
    applicationIds: number[];
    automaticallyAddNewApplications = true;
}

export class PermissionRequestAcceptUser {
    organizationId: number;
    userId: number;
    permissionIds: number[];
}

export interface PermissionResponse {
    type: PermissionTypes[];
    name: string;
    users?: UserResponse[];
    organization?: OrganisationResponse;
    applications?: Application[];
    applicationIds?: number[];
    id: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: number;
    updatedBy: number;
    createdByName: string;
    updatedByName: string;
    automaticallyAddNewApplications: boolean;
}

export interface PermissionGetManyResponse {
    data: PermissionResponse[];
    count: number;
}

export interface PermissionTypes {
    type: PermissionType;
}

export enum PermissionType {
    GlobalAdmin = "GlobalAdmin",
    OrganizationUserAdmin = "OrganizationUserAdmin",
    OrganizationGatewayAdmin = "OrganizationGatewayAdmin",
    OrganizationApplicationAdmin = "OrganizationApplicationAdmin",
    Read = "Read",
}
