import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Gateway, GatewayResponseMany } from "@app/gateway/gateway.model";
import { Application } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { IotDevicesApplicationMapResponse } from "@applications/iot-devices/iot-device.model";
import { TranslateService } from "@ngx-translate/core";
import { DeleteDialogService } from "@shared/components/delete-dialog/delete-dialog.service";
import { OrganizationAccessScope } from "@shared/enums/access-scopes";
import { BackButton } from "@shared/models/back-button.model";
import { ApplicationDialogModel } from "@shared/models/dialog.model";
import { DropdownButton } from "@shared/models/dropdown-button.model";
import { ChirpstackGatewayService } from "@shared/services/chirpstack-gateway.service";
import { MeService } from "@shared/services/me.service";
import { RestService } from "@shared/services/rest.service";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationChangeOrganizationDialogComponent } from "../application-change-organization-dialog/application-change-organization-dialog.component";
import moment from "moment/moment";

@Component({
  selector: "app-application",
  templateUrl: "./application-detail.component.html",
  styleUrls: ["./application-detail.component.scss"],
})
export class ApplicationDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() deleteApplication = new EventEmitter();
  public navTabs: any[] = [
    {
      label: "APPLICATION.IOT-DEVICES",
      link: "./iot-devices",
      index: 0,
    },
    {
      label: "APPLICATION.MULTICAST-GROUPS",
      link: "./multicast-groups",
      index: 1,
    },
    {
      label: "APPLICATION.DATATARGET-SHOW",
      link: "./data-targets",
      index: 2,
    },
  ];
  public applicationsSubscription: Subscription;
  public application: Application;
  public backButton: BackButton = { label: "", routerLink: "/applications" };
  public id: number;
  public dropdownButton: DropdownButton;
  public errorMessage: string;
  public canEdit = false;
  public devices: IotDevicesApplicationMapResponse[];
  public coordinateList = [];
  public gateways: Gateway[];
  public redMarker = "/assets/images/red-marker.png";
  public greenMarker = "/assets/images/green-marker.png";
  public greyMarker = "/assets/images/grey-marker.png";
  private deviceSubscription: Subscription;
  private gatewaysSubscription: Subscription;

  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    public router: Router,
    private meService: MeService,
    private titleService: Title,
    private deleteDialogService: DeleteDialogService,
    private restService: RestService,
    private sharedVariableService: SharedVariableService,
    private chirpstackGatewayService: ChirpstackGatewayService,
    private changeOrganizationDialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");

    if (this.id) {
      this.bindApplication(this.id);
      this.dropdownButton = {
        label: "",
        editRouterLink: "../edit-application/" + this.id,
        isErasable: true,
        extraOptions: [],
      };

      this.translate.get("APPLICATION.CHANGE-ORGANIZATION.TITLE").subscribe(translation => {
        this.dropdownButton.extraOptions.push({
          id: this.id,
          label: translation,
          onClick: () => this.onOpenChangeOrganizationDialog(),
        });
      });
    }

    this.translate
      .get(["NAV.APPLICATIONS", "APPLICATION-TABLE-ROW.SHOW-OPTIONS", "TITLE.APPLICATION"])
      .subscribe(translations => {
        this.backButton.label = translations["NAV.APPLICATIONS"];
        this.dropdownButton.label = translations["APPLICATION-TABLE-ROW.SHOW-OPTIONS"];
        this.titleService.setTitle(translations["TITLE.APPLICATION"]);
      });
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite,
      undefined,
      this.id
    );
    this.applicationService.canEdit = this.canEdit;
    this.applicationService.id = this.id;
    if (this.router.url.split("/").length <= 3) {
      this.router.navigateByUrl(`/applications/${this.id}/iot-devices`, {
        replaceUrl: true,
      });
    }
  }

  ngAfterViewInit() {
    this.deviceSubscription = this.getDevices().subscribe(devices => {
      this.devices = devices;
      this.mapDevicesToCoordinateList();
      this.getGateways();
    });
  }

  onDeleteApplication() {
    this.deleteDialogService.showApplicationDialog(this.application).subscribe(response => {
      if (response) {
        this.applicationService.deleteApplication(this.application.id).subscribe(response => {
          if (response.ok && response.body.affected > 0) {
            console.log("delete application with id:" + this.application.id.toString());
            this.router.navigate(["applications"]);
          } else {
            this.errorMessage = response?.error?.message;
          }
        });
      } else {
        console.log(response);
      }
    });
  }

  onOpenChangeOrganizationDialog() {
    this.changeOrganizationDialog.open(ApplicationChangeOrganizationDialogComponent, {
      data: {
        applicationId: this.id,
        organizationId: this.application.belongsTo.id,
      } as ApplicationDialogModel,
    });
  }

  bindApplication(id: number): void {
    this.applicationsSubscription = this.applicationService.getApplication(id).subscribe(application => {
      this.application = application;
      this.cdr.detectChanges();
    });
  }

  getDevices(): Observable<IotDevicesApplicationMapResponse[]> {
    return this.restService.get(`application/${this.id}/iot-devices-map`).pipe(
      map((data: IotDevicesApplicationMapResponse[]) => {
        // For some reason, the backend is not capable to sort MQTT_EXTERNAL_BROKER and MQTT_INTERNAL_BROKER.
        // Therefore we do it manually in the frontend.
        return data;
      })
    );
  }

  ngOnDestroy() {
    this.gatewaysSubscription.unsubscribe();
    this.deviceSubscription?.unsubscribe();
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }

  private getGateways(): void {
    this.gatewaysSubscription = this.chirpstackGatewayService
      .getForMaps()
      .subscribe((gateways: GatewayResponseMany) => {
        this.gateways = gateways.resultList;
        this.mapGatewaysToCoordinateList();
      });
  }

  private mapDevicesToCoordinateList() {
    const tempCoordinateList = [];
    this.devices.map(dev => {
      if (!dev.location) {
        return;
      }
      const isActive = dev.latestSentMessage
        ? moment(dev.latestSentMessage).unix() > moment(new Date()).subtract(1, "day").unix()
        : false;

      tempCoordinateList.push({
        longitude: dev.location.coordinates[0],
        latitude: dev.location.coordinates[1],
        draggable: false,
        editEnabled: false,
        useGeolocation: false,
        markerInfo: {
          name: dev.name,
          active: isActive,
          id: dev.id,
          isDevice: true,
          isGateway: false,
          internalOrganizationId: this.sharedVariableService.getSelectedOrganisationId(),
          networkTechnology: dev.type,
          lastActive: dev.latestSentMessage,
        },
      });
    });

    this.coordinateList = tempCoordinateList;
  }

  private mapGatewaysToCoordinateList() {
    const tempcoordinateList = [];
    this.gateways.map(gateway =>
      tempcoordinateList.push({
        longitude: gateway.location.longitude,
        latitude: gateway.location.latitude,
        draggable: false,
        editEnabled: false,
        useGeolocation: false,
        markerInfo: {
          name: gateway.name,
          active: this.getGatewayStatus(gateway),
          id: gateway.gatewayId,
          isDevice: false,
          isGateway: true,
          internalOrganizationId: gateway.organizationId,
          internalOrganizationName: gateway.organizationName,
        },
      })
    );
    this.coordinateList.push.apply(this.coordinateList, tempcoordinateList);
  }

  private getGatewayStatus(gateway: Gateway): boolean {
    return this.chirpstackGatewayService.isGatewayActive(gateway);
  }
}
