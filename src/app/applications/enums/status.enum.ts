import { enumToEntries } from '@shared/helpers/enum.helper';

export enum ApplicationStatus {
  'NONE' = 0,
  'IN-OPERATION' = 1,
  'PROJECT' = 2,
  'PROTOTYPE' = 3,
  'OTHER' = 4,
}

export const ApplicationStatusEntries = enumToEntries(ApplicationStatus);
