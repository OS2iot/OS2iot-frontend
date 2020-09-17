import { Permission } from '../usergroups/permission.model';

export class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    password: string;
    active: boolean;
    lastLogin: Date;
    permissions: Permission[];
}

export interface UserResponse {
    data: User[];
    count: number;
}
