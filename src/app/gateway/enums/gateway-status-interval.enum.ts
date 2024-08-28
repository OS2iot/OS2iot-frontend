import moment from "moment";
import { recordToEntries } from "@shared/helpers/record.helper";

export enum GatewayStatusInterval {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export const gatewayStatusIntervalToDate = (interval: GatewayStatusInterval): Date => {
  const now = new Date();

  switch (interval) {
    case GatewayStatusInterval.WEEK:
      return moment(now).subtract(7, "days").toDate();
    case GatewayStatusInterval.MONTH:
      return moment(now).subtract(30, "days").toDate();
    default:
      return moment(now).subtract(1, "days").toDate();
  }
};

export enum GatewayPlacement {
  "NONE" = "NONE",
  "OUTDOORS" = "OUTDOORS",
  "INDOORS" = "INDOORS",
  "OTHER" = "OTHER",
}

export enum GatewaySetupStatus {
  "NONE" = "NONE",
  "IN-OPERATION" = "IN-OPERATION",
  "PROJECT" = "PROJECT",
  "PROTOTYPE" = "PROTOTYPE",
  "OTHER" = "OTHER",
}

export const GatewayPlacementEntries = recordToEntries(GatewayPlacement);

export const GatewayStatusEntries = recordToEntries(GatewaySetupStatus);
