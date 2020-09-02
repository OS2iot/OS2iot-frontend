import { DataTargetType } from '../shared/enums/datatarget-type';

export class Datatarget {
    id: number;
    name: string;
    applicationId: number;
    type: DataTargetType = DataTargetType.HttpPush;
    url: string;
    //default 30 sec
    timeout: number = 30000;
    authorizationHeader: string = null;
}

export class DatatargetData {
    data: Datatarget[];
    ok?: boolean;
    count?: number;
}