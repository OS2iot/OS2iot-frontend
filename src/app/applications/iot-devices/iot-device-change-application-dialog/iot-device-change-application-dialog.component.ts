import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Organisation } from "@app/admin/organisation/organisation.model";
import { OrganisationService } from "@app/admin/organisation/organisation.service";
import { DeviceModelService } from "@app/device-model/device-model.service";
import { DeviceModel } from "@app/device-model/device.model";
import { Application } from "@applications/application.model";
import { ApplicationService } from "@applications/application.service";
import { TranslateService } from "@ngx-translate/core";
import { IoTDeviceApplicationDialogModel } from "@shared/models/dialog.model";
import { SharedVariableService } from "@shared/shared-variable/shared-variable.service";
import { ReplaySubject, Subscription } from "rxjs";
import { IotDevice, UpdateIoTDeviceApplication } from "../iot-device.model";
import { IoTDeviceService } from "../iot-device.service";
import { PayloadDecoder, PayloadDecoderMappedResponse } from "@payload-decoder/payload-decoder.model";
import { PayloadDecoderService } from "@payload-decoder/payload-decoder.service";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import {
  PayloadDeviceDatatarget,
  PayloadDeviceDatatargetGetByDataTargetResponse,
} from "@payload-decoder/payload-device-data.model";
import { PayloadDeviceDatatargetService } from "@payload-decoder/payload-device-datatarget.service";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-iot-device-change-application-dialog",
  templateUrl: "./iot-device-change-application-dialog.component.html",
  styleUrls: ["./iot-device-change-application-dialog.component.scss"],
})
export class IoTDeviceChangeApplicationDialogComponent implements OnInit {
  public iotDevicesSubscription: Subscription;
  public applicationsSubscription: Subscription;
  public organizationsSubscription: Subscription;
  public deviceModelSubscription: Subscription;
  private payloadDecoderSubscription: Subscription;
  private dataTargetSubscription: Subscription;
  private payloadDeviceDatatargetSubscription: Subscription;
  public iotDevice: IotDevice;
  public iotDeviceUpdate: UpdateIoTDeviceApplication;
  public organizations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);
  public applications: Application[];
  public filteredApplications: ReplaySubject<Application[]> = new ReplaySubject<Application[]>(1);
  public deviceModels: DeviceModel[];
  public devices: IotDevice[] = [];
  public payloadDecoders: PayloadDecoder[] = [];
  public dataTargets: Datatarget[] = [];
  faTimesCircle = faTimesCircle;

  constructor(
    private iotDeviceService: IoTDeviceService,
    private applicationService: ApplicationService,
    public translate: TranslateService,
    private organizationService: OrganisationService,
    private deviceModelService: DeviceModelService,
    private payloadDecoderService: PayloadDecoderService,
    private dateTargetService: DatatargetService,
    private payloadDeviceDatatargetService: PayloadDeviceDatatargetService,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<IoTDeviceChangeApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: IoTDeviceApplicationDialogModel
  ) {}

  ngOnInit(): void {
    this.translate.use("da");
    this.iotDeviceUpdate = {
      deviceModelId: this.dialogModel.deviceId,
      applicationId: 0,
      organizationId: 0,
      dataTargetToPayloadDecoderIds: [],
    };

    this.getIoTDeviceAndDefaultData(this.dialogModel.deviceId);
  }

  getIoTDeviceAndDefaultData(id: number): void {
    this.iotDevicesSubscription = this.iotDeviceService.getIoTDevice(id).subscribe((iotDevice: IotDevice) => {
      this.iotDevice = iotDevice;
      this.getOrganizations();
      this.getApplications();
      this.getPayloadDecoders();

      this.getDataTargets(this.iotDevice.application.id);
      this.getDeviceModels(this.iotDevice.application.belongsTo.id);

      this.iotDeviceUpdate.deviceModelId = this.iotDevice.deviceModel.id;
      this.iotDeviceUpdate.applicationId = this.iotDevice.application.id;
      this.iotDeviceUpdate.organizationId = this.iotDevice.application.belongsTo.id;

      this.getIoTDeviceCurrentDataTargetsAndPayloadDecoders(this.dialogModel.deviceId);
    });
  }

  getIoTDeviceCurrentDataTargetsAndPayloadDecoders(id: number): void {
    this.payloadDeviceDatatargetSubscription = this.payloadDeviceDatatargetService
      .getByIoTDevice(id)
      .subscribe(dataTargetsAndPayloadDecoders => {
        const dataTargetsAndPayloadIds = dataTargetsAndPayloadDecoders.data.map(val => {
          return { dataTargetId: val.dataTarget.id, payloadDecoderId: val.payloadDecoder.id };
        });
        this.iotDeviceUpdate.dataTargetToPayloadDecoderIds.push(...dataTargetsAndPayloadIds);
      });
  }

  getOrganizations() {
    this.organizationsSubscription = this.organizationService.getMultipleWithApplicationAdmin().subscribe(res => {
      this.organizations.next(res.data.slice());
    });
  }

  getApplications(): void {
    this.applicationsSubscription = this.applicationService
      .getApplications(1000, 0, "asc", "id")
      .subscribe(applicationData => {
        this.applications = applicationData.data;
        this.filteredApplications.next(
          this.applications.filter(app => app.belongsTo.id === this.iotDevice.application.belongsTo.id)
        );
      });
  }

  getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService
      .getMultiple(1000, 0, "id", "ASC")
      .subscribe((response: PayloadDecoderMappedResponse) => {
        this.payloadDecoders = response.data.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      });
  }

  getDataTargets(applicationId: number) {
    this.dataTargetSubscription = this.dateTargetService
      .getByApplicationId(1000, 0, applicationId)
      .subscribe(response => {
        this.dataTargets = response.data;
      });
  }

  getDeviceModels(organizationId: number) {
    this.deviceModelSubscription = this.deviceModelService
      .getMultiple(1000, 0, "asc", "id", organizationId)
      .subscribe(res => {
        this.deviceModels = res.data;
      });
  }

  public addRow() {
    this.iotDeviceUpdate.dataTargetToPayloadDecoderIds.push({
      dataTargetId: null,
      payloadDecoderId: null,
    });
  }

  public deleteRow(index) {
    this.iotDeviceUpdate.dataTargetToPayloadDecoderIds.splice(index, 1);
  }

  onOrganizationChange() {
    this.filteredApplications.next(
      this.applications.filter(app => app.belongsTo.id === this.iotDeviceUpdate.organizationId)
    );
    this.iotDeviceUpdate.applicationId = 0;
    this.iotDeviceUpdate.deviceModelId = 0;
    this.iotDeviceUpdate.dataTargetToPayloadDecoderIds = [];
    this.dataTargets = [];
    this.getDeviceModels(this.iotDeviceUpdate.organizationId);
  }

  onApplicationChange() {
    this.getDataTargets(this.iotDeviceUpdate.applicationId);
    this.iotDeviceUpdate.dataTargetToPayloadDecoderIds = [];
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onSubmit() {
    if (
      !this.iotDeviceUpdate.applicationId ||
      !this.iotDeviceUpdate.organizationId ||
      !this.iotDeviceUpdate.deviceModelId
    )
      return;

    this.iotDevicesSubscription = this.iotDeviceService
      .changeIoTDeviceApplication(this.iotDevice.id, this.iotDeviceUpdate)
      .subscribe(savedIoTDevice => {
        this.snackBar.open(
          this.translate.instant("APPLICATION.CHANGE-ORGANIZATION.SNACKBAR-SAVED", {
            applicationName: savedIoTDevice.name,
            organizationName: savedIoTDevice.application.belongsTo.name,
          }),
          "",
          {
            duration: 10000,
          }
        );
        this.dialog.close(true);
      });
  }
}
