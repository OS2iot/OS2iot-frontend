import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
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
import { ReplaySubject } from "rxjs";
import { IotDevice, UpdateIoTDeviceApplication } from "../iot-device.model";
import { IoTDeviceService } from "../iot-device.service";
import { PayloadDecoder, PayloadDecoderMappedResponse } from "@payload-decoder/payload-decoder.model";
import { PayloadDecoderService } from "@payload-decoder/payload-decoder.service";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { PayloadDeviceDatatargetService } from "@payload-decoder/payload-device-datatarget.service";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-iot-device-change-application-dialog",
  templateUrl: "./iot-device-change-application-dialog.component.html",
  styleUrls: ["./iot-device-change-application-dialog.component.scss"],
  standalone: false,
})
export class IoTDeviceChangeApplicationDialogComponent implements OnInit, OnDestroy {
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
  private subscriptions = [];

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  getIoTDeviceAndDefaultData(id: number): void {
    const iotDevicesSubscription = this.iotDeviceService.getIoTDevice(id).subscribe((iotDevice: IotDevice) => {
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

    this.subscriptions.push(iotDevicesSubscription);
  }

  getIoTDeviceCurrentDataTargetsAndPayloadDecoders(id: number): void {
    const payloadDeviceDatatargetSubscription = this.payloadDeviceDatatargetService
      .getByIoTDevice(id)
      .subscribe(dataTargetsAndPayloadDecoders => {
        const dataTargetsAndPayloadIds = dataTargetsAndPayloadDecoders.data.map(val => {
          return { dataTargetId: val.dataTarget.id, payloadDecoderId: val.payloadDecoder?.id };
        });
        this.iotDeviceUpdate.dataTargetToPayloadDecoderIds.push(...dataTargetsAndPayloadIds);
      });

    this.subscriptions.push(payloadDeviceDatatargetSubscription);
  }

  getOrganizations() {
    const organizationsSubscription = this.organizationService.getMultipleWithApplicationAdmin().subscribe(res => {
      this.organizations.next(res.data.slice());
    });

    this.subscriptions.push(organizationsSubscription);
  }

  getApplications(): void {
    const applicationsSubscription = this.applicationService
      .getApplications(1000, 0, "asc", "id")
      .subscribe(applicationData => {
        this.applications = applicationData.data;
        this.filteredApplications.next(
          this.applications.filter(app => app.belongsTo.id === this.iotDevice.application.belongsTo.id)
        );
      });

    this.subscriptions.push(applicationsSubscription);
  }

  getPayloadDecoders() {
    const payloadDecoderSubscription = this.payloadDecoderService
      .getMultiple(1000, 0, "id", "ASC")
      .subscribe((response: PayloadDecoderMappedResponse) => {
        this.payloadDecoders = response.data.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      });

    this.subscriptions.push(payloadDecoderSubscription);
  }

  getDataTargets(applicationId: number) {
    const dataTargetSubscription = this.dateTargetService
      .getByApplicationId(1000, 0, applicationId)
      .subscribe(response => {
        this.dataTargets = response.data;
      });

    this.subscriptions.push(dataTargetSubscription);
  }

  getDeviceModels(organizationId: number) {
    const deviceModelSubscription = this.deviceModelService
      .getMultiple(1000, 0, "asc", "id", organizationId)
      .subscribe(res => {
        this.deviceModels = res.data.sort((a, b) => a.body.name.localeCompare(b.body.name, "en", { numeric: true }));
      });

    this.subscriptions.push(deviceModelSubscription);
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
      this.iotDeviceUpdate.deviceModelId == null ||
      this.iotDeviceUpdate.dataTargetToPayloadDecoderIds.some(val => !val.dataTargetId)
    )
      return;

    const iotDevicesSubscription = this.iotDeviceService
      .changeIoTDeviceApplication(this.iotDevice.id, this.iotDeviceUpdate)
      .subscribe(savedIoTDevice => {
        this.snackBar.open(
          this.translate.instant("IOTDEVICE.CHANGE-APPLICATION.SNACKBAR-SAVED", {
            deviceName: savedIoTDevice.name,
            applicationName: savedIoTDevice.application.name,
          }),
          this.translate.instant("DIALOG.OK"),
          {
            duration: 10000,
          }
        );
        this.dialog.close(true);
        this.snackBar._openedSnackBarRef.afterDismissed().subscribe(() => location.reload());
      });

    this.subscriptions.push(iotDevicesSubscription);
  }
}
