import { PermissionResponse } from "../permission/permission.model";

export class ApiKeyRequest {
  id: number;
  name: string;
  permissionIds?: number[];
  expiresOn?: Date;
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
  expiresOn?: Date;
}

export interface ApiKeyGetManyResponse {
  data: ApiKeyResponse[];
  count: number;
}
