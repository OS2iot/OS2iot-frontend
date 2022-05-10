import { Pipe, PipeTransform } from '@angular/core';
import { StatusTimestamp } from '@app/gateway/gateway.model';

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
    return !statusTimestamps.length
      ? 'never-seen'
      : statusTimestamps.some(
          (gatewayTimestamp) =>
            gatewayTimestamp.timestamp.toISOString() === timestamp &&
            gatewayTimestamp.wasOnline
        )
      ? 'online'
      : 'offline';
  }
}
