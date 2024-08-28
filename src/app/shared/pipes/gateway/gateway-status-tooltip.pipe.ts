import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "gatewayStatusTooltip",
})
/**
 * Separate pipe to format text to avoid renders if none of the values
 * have changed.
 */
export class GatewayStatusTooltipPipe implements PipeTransform {
  transform(
    hasBeenSeen: boolean,
    neverSeenText: string,
    timestampLabel: string,
    timestamp: string,
    nameLabel: string,
    name: string,
    ..._: unknown[]
  ): string {
    const formattedTime = !hasBeenSeen ? neverSeenText : timestamp;
    return `${nameLabel}: ${name}\n${timestampLabel}: ${formattedTime}`;
  }
}
