import { Application } from '@applications/application.model';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { OpenDataDK } from './opendatadk/opendatadk.model';

export class DatatargetResponse {
    application: Application;
    id: number;
    name: string;
    timeout: number;
    type: DataTargetType;
    url: string;
    authorizationHeader: string;
    openDataDk: OpenDataDK;
}
