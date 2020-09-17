import { User } from '../users/user.model';

export class Permission {
    type: string;
    name: string;
    users: User[];
    id: number;
    createdAt: Date;
    updatedAt: Date;

}
