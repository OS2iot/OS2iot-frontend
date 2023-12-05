import { ControlledPropertyTypes } from '@app/device-model/Enums/controlled-propperty.enum';
import { ApplicationDeviceTypeUnion } from '@shared/enums/device-type';
import { ControlledProperty } from '@shared/models/controlled-property.model';
import { Organisation } from '../admin/organisation/organisation.model';
import { ApplicationStatus } from './enums/status.enum';
import { IotDevice } from './iot-devices/iot-device.model';
import { ApplicationDeviceType } from './models/application-device-type.model';
import { PermissionResponse } from '@app/admin/permission/permission.model';
import { Datatarget } from '@applications/datatarget/datatarget.model';

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
  public createdByName: string;
  public updatedByName: string;
  public status?: ApplicationStatus;
  public startDate?: Date;
  public endDate?: Date;
  public category?: string;
  public owner?: string;
  public contactPerson?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  public personalData?: boolean;
  public hardware?: string;
  public controlledProperties?: ControlledProperty[];
  public deviceTypes?: ApplicationDeviceType[];
  public permissions: PermissionResponse[];
  public permissionIds: number[];
  public dataTargets: Datatarget[];
}

export class ApplicationRequest {
  public name: string;
  public description: string;
  public organizationId: number;
  public status?: ApplicationStatus;
  public startDate?: Date;
  public endDate?: Date;
  public category?: string;
  public owner?: string;
  public contactPerson?: string;
  public contactEmail?: string;
  public contactPhone?: string;
  public personalData?: boolean;
  public hardware?: string;
  public controlledProperties?: ControlledPropertyTypes[];
  public deviceTypes?: ApplicationDeviceTypeUnion[];
  public permissionIds: number[];
}

export interface ApplicationData {
  data: Application[];
  ok?: boolean;
  count?: number;
}
