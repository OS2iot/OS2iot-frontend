import { Organisation } from '@app/admin/organisation/organisation.model';
import { SigFoxGroupData } from '@sigfox/sigfox-settings.model';
import { OrganizationInterface } from './organization.model';

export class SigfoxGroup extends OrganizationInterface {
    public id: number;
    public name: string;
    public username: string;
    public password?: string;
    public createdAt: Date;
    public updatedAt: Date;
    public belongsTo: Organisation;
    public sigFoxGroupData: SigFoxGroupData;
}

export class SigfoxgroupsResponse {
    result: SigfoxGroup[];
    totalCount?: string;
}
