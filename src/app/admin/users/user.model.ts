import { PermissionResponse } from '../permission/permission.model';

export class UserRequest {
    id: number;
    name: string;
    email: string;
    password: string;
    active: boolean;
    globalAdmin: boolean;
    showWelcomeScreen: boolean;
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
    showWelcomeScreen: boolean;
}

export interface UserGetManyResponse {
    data: UserResponse[];
    count: number;
}
