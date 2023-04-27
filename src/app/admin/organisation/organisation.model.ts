import { Application } from '@applications/application.model';
import { PayloadDecoder } from '../../payload-decoder/payload-decoder.model';
import { PermissionResponse } from '../permission/permission.model';

export class Organisation {
  id?: number;
  name: string;
}

export interface OrganisationResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  createdByName: string;
  updatedByName: string;
  name: string;
  openDataDkRegistered: boolean;

  payloadDecoders: PayloadDecoder[];
  applications: Application[];
  permissions: PermissionResponse[];
}

export interface OrganisationGetManyResponse {
  data: OrganisationResponse[];
  count: number;
}

export interface OrganisationGetMinimalResponse {
  data: Organisation[];
  count: number;
}
