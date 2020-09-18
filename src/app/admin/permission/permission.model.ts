import { OrganisationResponse } from '../organisation/organisation.model';
import { UserResponse } from '../users/user.model';

export class PermissionRequest {
  level:
    | PermissionType.OrganizationAdmin
    | PermissionType.Write
    | PermissionType.Read;

  name: string;

  organizationId: number;

  userIds: number[];
}

export interface PermissionResponse {
  type: PermissionType;
  name: string;
  users?: UserResponse[];
  organization?: OrganisationResponse;
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
