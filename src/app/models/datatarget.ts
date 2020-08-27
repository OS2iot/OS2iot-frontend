import { DataTargetType } from './datatarget-type';

export class Datatarget {
    id: string;
    name: string;
    applicationId: number;
    type: DataTargetType = DataTargetType.HttpPush;
    url: string;
    //default 30 sec
    timeout: number = 30000;
    authorizationHeader: string;
}

export class DatatargetData {
    data: Datatarget[];
    ok?: boolean;
    count?: number;
}