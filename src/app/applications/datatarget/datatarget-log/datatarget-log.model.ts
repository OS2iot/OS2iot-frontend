export class DatatargetLog {
  createdAt: Date;

  // TODO: Enum??
  type: string;

  message: string;

  // TODO: Reference to devices?
  device?: string;
}
