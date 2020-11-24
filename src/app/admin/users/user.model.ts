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
    name: string;
    nameId: string;
    email: string;
    active: boolean;
    lastLogin: Date;
    permissions: PermissionResponse[];
}

export interface UserGetManyResponse {
    data: UserResponse[];
    count: number;
}
