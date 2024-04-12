import { recordToEntries } from "@shared/helpers/record.helper";

export enum ApplicationStatus {
    "NONE" = "NONE",
    "IN-OPERATION" = "IN-OPERATION",
    "PROJECT" = "PROJECT",
    "PROTOTYPE" = "PROTOTYPE",
    "OTHER" = "OTHER",
}

export const ApplicationStatusEntries = recordToEntries(ApplicationStatus);
