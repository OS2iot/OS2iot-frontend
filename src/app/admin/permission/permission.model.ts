import { OrganisationResponse } from '../organisation/organisation.model';
import { UserResponse } from '../users/user.model';
import { Application } from '../../models/application';

export class PermissionRequest {
  level: PermissionType;
  // | PermissionType.OrganizationAdmin
  // | PermissionType.Write
  // | PermissionType.Read;

  name: string;

  organizationId: number;

  userIds: number[];

  applicationIds: number[];
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
}

export interface PermissionGetManyResponse {
  data: PermissionResponse[];
  count: number;
}

export enum PermissionType {
  GlobalAdmin = 'GlobalAdmin',
  OrganizationAdmin = 'OrganizationAdmin',
  Write = 'Write',
  Read = 'Read',
  OrganizationPermission = 'OrganizationPermission',
  OrganizationApplicationPermissions = 'OrganizationApplicationPermissions',
}
