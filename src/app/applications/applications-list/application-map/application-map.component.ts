import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ApplicationService } from "@applications/application.service";
import { ApplicationStatus, ApplicationStatusCheck } from "@applications/enums/status.enum";
import { IotDevicesApplicationMapResponse } from "@applications/iot-devices/iot-device.model";
import { MapCoordinates } from "@shared/components/map/map-coordinates.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { Subscription } from "rxjs";
import { SharedModule } from "../../../shared/shared.module";
import { ApplicationsFilterService } from "../application-filter/applications-filter.service";

@Component({
  selector: "app-application-map",
  standalone: true,
  imports: [MatCheckboxModule, SharedModule],
  templateUrl: "./application-map.component.html",
  styleUrls: ["./application-map.component.scss"],
})
export class ApplicationMapComponent implements OnInit, OnDestroy {
  public devices: IotDevicesApplicationMapResponse[] = [];
  filterValues: {
    status: ApplicationStatus | "All";
    statusCheck: ApplicationStatusCheck | "All";
    owner: string | "All";
  };
  private valueSubscription!: Subscription;

  constructor(
    private filterService: ApplicationsFilterService,
    private applicationService: ApplicationService,
    private sharedVariableService: SharedVariableService
  ) {}

  ngOnInit() {
    this.getApplications();
    this.valueSubscription = this.filterService.filterChanges$.subscribe(updatedValues => {
      this.filterValues = updatedValues;
    });
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  coordinateList: MapCoordinates[] = null;

  private mapDevicesToCoordinateList() {
    const tempCoordinateList: MapCoordinates[] = [];

    if (Array.isArray(this.devices)) {
      this.devices.forEach(dev => {
        const [longitude, latitude] = dev.location.coordinates;

        tempCoordinateList.push({
          longitude: longitude,
          latitude: latitude,
          draggable: false,
          editEnabled: false,
          useGeolocation: false,
          markerInfo: {
            internalOrganizationName: "s",
            name: dev.name,
            active: true,
            id: dev.id,
            isDevice: true,
            internalOrganizationId: this.sharedVariableService.getSelectedOrganisationId(),
            networkTechnology: dev.type,
            lastActive: dev.latestSentMessage,
          },
        });
      });
    }

    this.coordinateList = tempCoordinateList;
  }

  getApplications(): void {
    // this.applicationService
    //   .getApplications(100000, 0, "asc", "id")
    //   .pipe(
    //     map(applicationData => {
    //       const filteredApplications = this.filterService.SortApplications(applicationData.data as Application[]);
    //       return filteredApplications.map(app => app.id);
    //     })
    //   )
    //   .subscribe(mappedCoordinates => {
    //     this.applicationService.getApplicationDevicesForMap(mappedCoordinates).subscribe(data => {
    //       this.devices = data;
    //       this.mapDevicesToCoordinateList();
    //     });
    //   });
  }
}
