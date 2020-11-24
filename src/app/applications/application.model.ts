import { Organisation } from '../admin/organisation/organisation.model';
import { IotDevice } from './iot-devices/iot-device.model';

export class Application {
  public id: number;
  public createdAt: string;
  public updatedAt: string;
  public name: string;
  public description: string;
  public iotDevices?: IotDevice[];
  public belongsTo: Organisation;
  public createdBy: number;
  public updatedBy: number;
}

export class ApplicationRequest {
  public name: string;
  public description: string;
  public organizationId: number;
}

export interface ApplicationData {
  data: Application[];
  ok?: boolean;
  count?: number;
}
