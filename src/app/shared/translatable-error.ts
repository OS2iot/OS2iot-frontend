import { InterpolationParameters } from "@ngx-translate/core";

export class TranslatableError extends Error {
  constructor(
    msg: string,
    public readonly context?: InterpolationParameters
  ) {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TranslatableError.prototype);
  }
}
