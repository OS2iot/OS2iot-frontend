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
  private payloadDeviceDatatargetSubscription: Subscription;
  private dataTargetSubscription: Subscription;
  public iotDevice: IotDevice;
  public iotDeviceUpdate: UpdateIoTDeviceApplication;
  public organizations: ReplaySubject<Organisation[]> = new ReplaySubject<Organisation[]>(1);
  public applications: Application[];
  public filteredApplications: ReplaySubject<Application[]> = new ReplaySubject<Application[]>(1);
  public deviceModels: DeviceModel[];
  public devices: IotDevice[] = [];
  public filteredDeviceModels: ReplaySubject<DeviceModel[]> = new ReplaySubject<DeviceModel[]>(1);
  public payloadDecoders: PayloadDecoder[] = [];
  public payloadDeviceDatatarget: PayloadDeviceDatatarget[];
  public dataTargets: Datatarget[] = [];

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
      dataTargetIds: [],
    };
    this.getIoTDevice(this.dialogModel.deviceId);
    this.getOrganizations();
    this.getApplications();
    this.getDeviceModels();
    this.getPayloadDecoders();
  }

  getIoTDevice(id: number): void {
    this.iotDevicesSubscription = this.iotDeviceService.getIoTDevice(id).subscribe((iotDevice: IotDevice) => {
      //TODO set default data
      console.log(iotDevice, "dev");
      this.iotDevice = iotDevice;
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
      });
  }

  getDeviceModels() {
    this.deviceModelSubscription = this.deviceModelService.getMultiple(1000, 0, "asc", "id").subscribe(res => {
      this.deviceModels = res.data;
    });
  }

  getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService
      .getMultiple(1000, 0, "id", "ASC")
      .subscribe((response: PayloadDecoderMappedResponse) => {
        this.payloadDecoders = response.data.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      });
  }

  getDataTargets() {
    this.dataTargetSubscription = this.dateTargetService
      .getByApplicationId(1000, 0, this.iotDeviceUpdate.applicationId)
      .subscribe(response => {
        this.dataTargets = response.data;
      });
  }

  getPayloadDeviceDatatarget(id: number) {
    this.payloadDeviceDatatargetSubscription = this.payloadDeviceDatatargetService
      .getByDataTarget(id)
      .subscribe((response: PayloadDeviceDatatargetGetByDataTargetResponse) => {
        this.mapToDatatargetDevicePayload(response);
      });
  }

  private mapToDatatargetDevicePayload(dto: PayloadDeviceDatatargetGetByDataTargetResponse) {
    this.payloadDeviceDatatarget = [];
    dto.data.forEach(element => {
      this.payloadDeviceDatatarget.push({
        id: element.id,
        iotDeviceIds: element.iotDevices.map(x => x.id),
        payloadDecoderId: element.payloadDecoder?.id === undefined ? 0 : element.payloadDecoder?.id,
        dataTargetId: element.dataTarget.id,
      });
    });
  }

  public selectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = this.devices.map(device => device.id);
  }

  public deselectAllDevices(index: number) {
    this.payloadDeviceDatatarget[index].iotDeviceIds = [];
  }

  public addRow() {
    if (!this.payloadDeviceDatatarget) {
      this.payloadDeviceDatatarget = [];
    }
    this.payloadDeviceDatatarget.push({
      id: null,
      iotDeviceIds: [],
      payloadDecoderId: null,
      dataTargetId: 1,
    });
  }

  private deleteRow(index) {
    if (this.payloadDeviceDatatarget.length === 0) {
    } else if (this.payloadDeviceDatatarget[index]?.id === null) {
      this.payloadDeviceDatatarget.splice(index, 1);
    } else {
      this.payloadDeviceDatatargetService.delete(this.payloadDeviceDatatarget[index].id).subscribe(() => {
        this.payloadDeviceDatatarget.splice(index, 1);
      });
    }
  }

  onOrganizationChange() {
    this.filteredApplications.next(
      this.applications.filter(app => app.belongsTo.id === this.iotDeviceUpdate.organizationId)
    );
    this.filteredDeviceModels.next(
      this.deviceModels.filter(deviceModel => deviceModel.belongsTo.id === this.iotDeviceUpdate.organizationId)
    );
    this.iotDeviceUpdate.applicationId = 0;
    this.iotDeviceUpdate.deviceModelId = 0;
    this.iotDeviceUpdate.dataTargetIds = [];
  }

  onApplicationChange() {
    this.getDataTargets();
  }

  public compare(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onSubmit() {
    // this.applicationsSubscription = this.applicationService
    //   .updateApplicationOrganization(this.application, this.dialogModel.applicationId)
    //   .subscribe(savedApplication => {
    //     this.snackBar.open(
    //       this.translate.instant("APPLICATION.CHANGE-ORGANIZATION.SNACKBAR-SAVED", {
    //         applicationName: savedApplication.name,
    //         organizationName: savedApplication.belongsTo.name,
    //       }),
    //       "",
    //       {
    //         duration: 10000,
    //       }
    //     );
    //     this.dialog.close(true);
    //   });
  }
}
