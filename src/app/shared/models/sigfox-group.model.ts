import { OrganizationInterface } from './organization.model';

export class SigfoxGroup extends OrganizationInterface {
    name: string;
    username: string;
    password: string;
}
