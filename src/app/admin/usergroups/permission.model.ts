import { UserRequest } from '../users/user.model';

export class Permission {
    type: string;
    name: string;
    users: UserRequest[];
    id: number;
    createdAt: Date;
    updatedAt: Date;

}
