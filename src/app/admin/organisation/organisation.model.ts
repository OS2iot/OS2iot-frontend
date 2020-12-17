import { Application } from '@applications/application.model';
import { PayloadDecoder } from '../../payload-decoder/payload-decoder.model';

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

  payloadDecoders: PayloadDecoder[];
  applications: Application[];
  // TODO: This.
  permissions: any[];
}

export interface OrganisationGetManyResponse {
  data: OrganisationResponse[];
  count: number;
}

export interface OrganisationGetMinimalResponse {
  data: Organisation[];
  count: number;
}