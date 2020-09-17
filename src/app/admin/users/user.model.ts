import { Permission } from '../usergroups/permission.model';

export class User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    active: boolean;
    lastLogin: Date;
    permissions: Permission[];
}

export interface UsersResponse {
    data: User[];
    count: number;
}

export interface UserResponse {
    user: User;
}

export class UserRequest {
    user: User;
    constructor(user: User) {
        this.user = user;
    }
}