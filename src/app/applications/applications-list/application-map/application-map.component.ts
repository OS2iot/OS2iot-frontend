import { Component } from "@angular/core";
import { ApplicationService } from "@applications/application.service";
import { MapCoordinates } from "@shared/components/map/map-coordinates.model";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: "app-application-map",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./application-map.component.html",
  styleUrl: "./application-map.component.scss",
})
export class ApplicationMapComponent {
  constructor(private applicationService: ApplicationService) {}



  coordinateList: MapCoordinates[] = [
    {
      latitude: 120,
      longitude: 120,
      draggable: false,
      editEnabled: false,
      useGeolocation: true,
      markerInfo: {
        active: true,
        id: 22,
        internalOrganizationId: 22,
        internalOrganizationName: "22",
        isDevice: false,
        lastActive: new Date(),
        name: "test",
        networkTechnology: "lora",
      },
    },
  ];

  getApplications(): void {
    const applicationsSubscription = this.applicationService
      .getApplications(100000, 0, "asc", "id")
      .subscribe(applicationData => { applicationData.data.forEach(
       data => this.coordinateList.push() data.
      )});
  }
}
