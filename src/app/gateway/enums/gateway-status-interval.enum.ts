import * as moment from 'moment';

export enum GatewayStatusInterval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}

export const gatewayStatusIntervalToDate = (
  interval: GatewayStatusInterval
): Date => {
  const now = new Date();

  switch (interval) {
    case GatewayStatusInterval.WEEK:
      return moment(now).subtract(7, 'days').toDate();
    case GatewayStatusInterval.MONTH:
      return moment(now).subtract(30, 'days').toDate();
    default:
      return moment(now).subtract(1, 'days').toDate();
  }
};
