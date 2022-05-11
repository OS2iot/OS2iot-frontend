import { OrganisationResponse } from '../organisation/organisation.model';
import { UserResponse } from '../users/user.model';
import { Application } from '../../applications/application.model';

export class PermissionRequest {
  level: PermissionType;
  name: string;
  organizationId: number;
  userIds: number[];
  applicationIds: number[];
  automaticallyAddNewApplications = true;
}

export interface PermissionResponse {
  type: PermissionType;
  name: string;
  users?: UserResponse[];
  organization?: OrganisationResponse;
  applications?: Application[];
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

export enum PermissionType {
  GlobalAdmin = 'GlobalAdmin',
  OrganizationUserAdmin = 'OrganizationUserAdmin',
  OrganizationGatewayAdmin = 'OrganizationGatewayAdmin',
  OrganizationApplicationAdmin = 'OrganizationApplicationAdmin',
  Read = 'Read',
  OrganizationPermission = 'OrganizationPermission',
  OrganizationApplicationPermissions = 'OrganizationApplicationPermissions',
}
