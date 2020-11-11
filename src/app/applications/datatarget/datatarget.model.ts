import { DataTargetType } from '@shared/enums/datatarget-type';
import { OpenDataDK } from './opendatadk/opendatadk.model';

export class Datatarget {
    id: number;
    name: string;
    applicationId: number;
    type: DataTargetType = DataTargetType.HTTPPUSH;
    url: string;
    //default 30 sec
    timeout: number = 30000;
    authorizationHeader: string;
    setToOpendataDk = false;
    openDataDk: OpenDataDK;
}

export class DatatargetData {
    data: Datatarget[];
    ok?: boolean;
    count?: number;
}