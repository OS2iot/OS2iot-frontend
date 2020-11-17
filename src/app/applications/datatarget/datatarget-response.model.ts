import { Application } from '@applications/application.model';
import { DataTargetType } from '@shared/enums/datatarget-type';
import { OpenDataDkDataset } from './opendatadk/opendatadk-dataset.model';

export class DatatargetResponse {
    application: Application;
    id: number;
    name: string;
    timeout: number;
    type: DataTargetType;
    url: string;
    authorizationHeader: string;
    openDataDk: OpenDataDkDataset;
}
