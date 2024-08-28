import { Component, Input, OnInit } from "@angular/core";
import { ApplicationStatus } from "@applications/enums/status.enum";
import { ApplicationDeviceType } from "@applications/models/application-device-type.model";
import { TranslateService } from "@ngx-translate/core";
import { toPascalKebabCase } from "@shared/helpers/string.helper";
import { ControlledProperty } from "@shared/models/controlled-property.model";
import { PermissionResponse } from "@app/admin/permission/permission.model";

@Component({
  selector: "app-metadata-details",
  templateUrl: "./metadata-details.component.html",
  styleUrls: ["./metadata-details.component.scss"],
})
export class MetadataDetailsComponent implements OnInit {
  @Input() permissions?: PermissionResponse[];
  @Input() status?: ApplicationStatus;
  @Input() startDate?: Date;
  @Input() endDate?: Date;
  @Input() category?: string;
  @Input() owner?: string;
  @Input() contactPerson?: string;
  @Input() contactEmail?: string;
  @Input() contactPhone?: string;
  @Input() personalData?: boolean;
  @Input() hardware?: string;
  @Input() controlledProperties?: ControlledProperty[];
  @Input() deviceTypes?: ApplicationDeviceType[];
  controlledPropertyText: string;
  deviceTypeText: string;

  entries = Object.entries;
  toPascalKebabCase = toPascalKebabCase;
  ApplicationStatus = ApplicationStatus;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.use("da");

    this.controlledPropertyText = this.controlledProperties.map(type => type.type).join(", ");

    this.translate.get("IOT-DEVICE-TYPES").subscribe(translations => {
      const translatedDeviceTypes: Record<string, string> = translations ?? {};

      this.deviceTypeText = this.deviceTypes
        .map(deviceType => translatedDeviceTypes[deviceType.type] ?? deviceType.type)
        .join(", ");
    });
  }
}
