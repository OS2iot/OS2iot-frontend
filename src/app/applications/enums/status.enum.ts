import { recordToEntries } from "@shared/helpers/record.helper";

export enum ApplicationState {
  "NONE" = "NONE",
  "IN-OPERATION" = "IN-OPERATION",
  "PROJECT" = "PROJECT",
  "PROTOTYPE" = "PROTOTYPE",
  "OTHER" = "OTHER",
}

export enum ApplicationStatus {
  WARNING = "WARNING",
  ALERT = "ALERT",
  STABLE = "STABLE",
}

export const ApplicationStateEntries = recordToEntries(ApplicationState);
