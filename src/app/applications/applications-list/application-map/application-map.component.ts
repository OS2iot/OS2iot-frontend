import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { Gateway } from "@app/gateway/gateway.model";
import { ApplicationService } from "@applications/application.service";
import { ApplicationStatus, ApplicationStatusCheck } from "@applications/enums/status.enum";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { MapCoordinates } from "@shared/components/map/map-coordinates.model";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { forkJoin, Subscription } from "rxjs";
import { SharedModule } from "@shared/shared.module";
import { ApplicationsFilterService } from "../application-filter/applications-filter.service";
import moment from "moment";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-application-map",
  standalone: true,
  imports: [MatCheckboxModule, SharedModule, FormsModule],
  templateUrl: "./application-map.component.html",
  styleUrls: ["./application-map.component.scss"],
})
export class ApplicationMapComponent implements OnInit, OnDestroy {
  public devices: IotDevice[] = [];
  public gateways: Gateway[] = [];
  public displayDevices: boolean = true;
  public displayGateways: boolean = true;

  filterValues: {
    status: ApplicationStatus | "All";
    statusCheck: ApplicationStatusCheck | "All";
    owner: string | "All";
  };
  coordinateList: MapCoordinates[] = null;
  private valueSubscription!: Subscription;

  constructor(
    private filterService: ApplicationsFilterService,
    private applicationService: ApplicationService,
    public translate: TranslateService,
    private sharedVariableService: SharedVariableService,
    private gatewayService: ChirpstackGatewayService
  ) {}

  ngOnInit() {
    this.loadMapData();

    this.valueSubscription = this.filterService.filterChanges$.subscribe(updatedValues => {
      this.filterValues = updatedValues;
    });
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  public mapToCoordinateList() {
    const tempCoordinateList: MapCoordinates[] = [];

    if (Array.isArray(this.devices) && this.displayDevices) {
      this.devices.forEach(dev => {
        if (!dev.location) return;

        const [longitude, latitude] = dev.location.coordinates;
        const isActive = dev.latestReceivedMessage?.sentTime
          ? moment(dev.latestReceivedMessage?.sentTime).unix() > moment(new Date()).subtract(1, "day").unix()
          : false;

        tempCoordinateList.push({
          longitude: longitude,
          latitude: latitude,
          draggable: false,
          editEnabled: false,
          useGeolocation: false,
          markerInfo: {
            internalOrganizationName: "s",
            name: dev.name,
            active: isActive,
            isGateway: false,
            id: dev.id,
            isDevice: true,
            internalOrganizationId: this.sharedVariableService.getSelectedOrganisationId(),
            networkTechnology: dev.type,
            lastActive: dev?.latestReceivedMessage?.sentTime,
          },
        });
      });
    }

    if (Array.isArray(this.gateways) && this.displayGateways) {
      this.gateways.forEach(gw => {
        if (!gw.location) return;

        tempCoordinateList.push({
          longitude: gw.location.longitude,
          latitude: gw.location.latitude,
          draggable: false,
          editEnabled: false,
          useGeolocation: false,
          markerInfo: {
            internalOrganizationName: gw.organizationName,
            name: gw.name,
            active: this.gatewayService.isGatewayActive(gw),
            id: gw.id,
            isDevice: false,
            isGateway: true,
            internalOrganizationId: this.sharedVariableService.getSelectedOrganisationId(),
            networkTechnology: "",
            lastActive: gw.lastSeenAt,
          },
        });
      });
    }

    this.coordinateList = tempCoordinateList;
  }

  private loadMapData(): void {
    forkJoin({
      devices: this.applicationService.getApplicationDevices(this.sharedVariableService.getSelectedOrganisationId()),
      gateways: this.gatewayService.getForMaps(),
    }).subscribe(({ devices, gateways }) => {
      this.devices = devices;
      this.gateways = gateways.resultList;

      this.mapToCoordinateList();
    });
  }
}
