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
  organizations: OrganisationResponse[];
}

export interface UserGetManyResponse {
  data: UserResponse[];
  count: number;
}

export class CreateNewKombitUserDto {
  email: string;
  organizations: Organisation[];
}

export class UpdateUserOrgsDto {
  organizations: Organisation[];
}
