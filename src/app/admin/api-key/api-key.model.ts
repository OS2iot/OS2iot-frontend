import { PermissionResponse } from '../permission/permission.model';

export class ApiKeyRequest {
  id: number;
  name: string;
  permissions?: number[];
}

export interface ApiKeyResponse {
  id: number;
  name: string;
  key: string;
  permissions?: PermissionResponse[];
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
}

export interface ApiKeyGetManyResponse {
  data: ApiKeyResponse[];
  count: number;
}
