import { Pipe, PipeTransform } from '@angular/core';
import { StatusTimestamp } from '@app/gateway/gateway.model';
import * as moment from 'moment';

const classNeverSeen = 'never-seen';
const classOffline = 'offline';
const classOnline = 'online';

@Pipe({
  name: 'gatewayStatusClass',
})
/**
 * Separate pipe to format text to avoid renders if none of the values
 * have changed.
 */
export class GatewayStatusClassPipe implements PipeTransform {
  transform(
    statusTimestamps: StatusTimestamp[],
    timestamp: string,
    ..._: unknown[]
  ): string {
    if (!statusTimestamps.length) {
      return classNeverSeen;
    }

    let currentStatus = classOffline;
    const selectedDate = moment(timestamp).toDate();

    for (const gatewayTimestamp of statusTimestamps) {
      const isoGatewayTimestamp = gatewayTimestamp.timestamp.toISOString();

      if (isoGatewayTimestamp === timestamp) {
        return gatewayTimestamp.wasOnline ? classOnline : classOffline;
      }

      if (gatewayTimestamp.timestamp > selectedDate) {
        return currentStatus;
      }

      currentStatus = gatewayTimestamp.wasOnline ? classOnline : classOffline;
    }

    return currentStatus;
  }
}
