import { Profiler } from 'inspector';
import { Permission } from '../usergroups/permission.model';

export class User {
    id?: number;
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
    permissions: Permission[];
    password?: string;
}

export interface UserGetManyResponse {
    data: UserResponse[];
    count: number;
}
