import { ControlledPropertyTypes } from '@app/device-model/Enums/controlled-propperty.enum';
import { Application } from '@applications/application.model';

export class ControlledProperty {
  public applications: Application[];
  public type: ControlledPropertyTypes;
}
