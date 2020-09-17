import { PermissionResponse } from '../permission/permission.model';

export class UserRequest {
    name: string;
    email: string;
    password: string;
    active: boolean;
}

export interface UserResponse {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    email: string;
    active: boolean;
    lastLogin: Date;
    permissions: PermissionResponse[];
}

export interface UserGetManyResponse {
    data: UserResponse[];
    count: number;
}
