import { Organisation } from "@app/admin/organisation/organisation.model";
import { SigfoxGroupData } from "@app/sigfox/sigfox-settings.model";
import { OrganizationInterface } from "./organization.model";

export class SigfoxGroup extends OrganizationInterface {
    public id: number;
    public name: string;
    public username: string;
    public password?: string;
    public createdAt: Date;
    public updatedAt: Date;
    public belongsTo: Organisation;
    public sigfoxGroupData: SigfoxGroupData;
}

export class SigfoxgroupsResponse {
    result: SigfoxGroup[];
    totalCount?: string;
}
