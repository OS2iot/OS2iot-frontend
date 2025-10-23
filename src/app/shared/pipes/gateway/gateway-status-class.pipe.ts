import { Pipe, PipeTransform } from "@angular/core";
import { StatusTimestamp } from "@app/gateway/gateway.model";
import moment from "moment";

const neverSeenClass = "never-seen";
const offlineClass = "offline";
const onlineClass = "online";

@Pipe({
    name: "gatewayStatusClass",
    standalone: false
})
/**
 * Separate pipe to format text to avoid renders if none of the values
 * have changed.
 */
export class GatewayStatusClassPipe implements PipeTransform {
  transform(statusTimestamps: StatusTimestamp[], timestamp: string, ..._: unknown[]): string {
    if (!statusTimestamps.length) {
      return neverSeenClass;
    }

    let currentStatusClass = offlineClass;
    const selectedDate = moment(timestamp).toDate();

    for (const gatewayTimestamp of statusTimestamps) {
      const isoGatewayTimestamp = gatewayTimestamp.timestamp.toISOString();

      if (isoGatewayTimestamp === timestamp) {
        return gatewayTimestamp.wasOnline ? onlineClass : offlineClass;
      }

      if (gatewayTimestamp.timestamp > selectedDate) {
        return currentStatusClass;
      }

      currentStatusClass = gatewayTimestamp.wasOnline ? onlineClass : offlineClass;
    }

    return currentStatusClass;
  }
}
