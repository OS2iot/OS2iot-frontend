import { Application } from "@applications/application.model";
import { ApplicationDeviceTypeUnion } from "@shared/enums/device-type";

export class ApplicationDeviceType {
  public applications: Application[];
  public type: ApplicationDeviceTypeUnion;
}
