import {
  Organisation,
  OrganisationResponse,
} from '../organisation/organisation.model';
import { PermissionResponse } from '../permission/permission.model';

export class UserRequest {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  globalAdmin: boolean;
}

export interface UserResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
  name: string;
  nameId: string;
  email: string;
  active: boolean;
  lastLogin: Date;
  permissions: PermissionResponse[];
  awaitingConfirmation: boolean;
  requestedOrganizations: OrganisationResponse[];
}

export interface UserGetManyResponse {
  data: UserResponse[];
  count: number;
}

export class CreateNewKombitUserFromFrontend {
  email: string;
  requestedOrganizations: Organisation[];
}

export class UpdateUserOrgFromFrontend {
  requestedOrganizations: Organisation[];
}

export class UpdateUserOrgsDto {
  requestedOrganizationIds: number[];
}

export class RejectUserDto {
  orgId: number;
  userIdToReject: number;
}

export class CreateNewKombitUserDto {
  email: string;
  requestedOrganizationIds: number[];
}
