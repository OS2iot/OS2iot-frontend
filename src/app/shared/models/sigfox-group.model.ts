import { Organisation } from '@app/admin/organisation/organisation.model';

export class SigFoxGroup {
    public id: number;
    public name: string;
    public username: string;
    public password: string;
    public createdAt: Date;
    public updatedAt: Date;
    public belongsTo: Organisation;
}
