import { Component, OnDestroy, OnInit } from "@angular/core";
import { IoTDeviceService } from "@applications/iot-devices/iot-device.service";
import { ApplicationService } from "@applications/application.service";
import { Application } from "@applications/application.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { ActivatedRoute } from "@angular/router";
import { MatSelectChange } from "@angular/material/select";
import { DatatargetService } from "@applications/datatarget/datatarget.service";
import { Datatarget } from "@applications/datatarget/datatarget.model";
import { DataTargetType } from "@shared/enums/datatarget-type";
import { PayloadDecoderMinimal } from "@payload-decoder/payload-decoder.model";
import { PayloadDecoderService } from "@payload-decoder/payload-decoder.service";
import { PayloadDeviceDatatargetService } from "@payload-decoder/payload-device-datatarget.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-datatarget-test-connection",
  templateUrl: "./datatarget-test-connection.component.html",
  styleUrl: "./datatarget-test-connection.component.scss",
})
export class DatatargetTestConnectionComponent implements OnInit, OnDestroy {
  editorJsonOutputOptions = {
    theme: "vs",
    language: "json",
    autoIndent: true,
    roundedSelection: true,
    minimap: { enabled: false },
    readOnly: true,
  };
  editorJsonInputOptions = {
    theme: "vs",
    language: "json",
    autoIndent: true,
    roundedSelection: true,
    minimap: { enabled: false },
    readOnly: false,
  };

  public iotDevices: IotDevice[];
  public payloadDecoders: PayloadDecoderMinimal[];
  public payloadData = "";
  public testResponse = "";
  public decodedData = "";
  public dataTarget: Datatarget;
  public payloadDecoderId: number;
  public loading = false;
  protected readonly DataTargetType = DataTargetType;
  private applicationId: number;
  private dataTargetId: number;
  private iotDeviceId: number;
  private subscriptions = [];

  constructor(
    private deviceService: IoTDeviceService,
    public translate: TranslateService,
    private dataTargetService: DatatargetService,
    private route: ActivatedRoute,
    private payloadDecoderService: PayloadDecoderService,
    private payloadDeviceDataTargetService: PayloadDeviceDatatargetService,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = +this.route.parent.snapshot.paramMap.get("id");
    this.dataTargetId = +this.route.parent.snapshot.paramMap.get("datatargetId");
    this.getDevices();
    this.getDatatarget();
    this.getPayloadDecoders();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s?.unsubscribe());
  }

  getDevices() {
    const deviceSubscription = this.applicationService
      .getApplication(this.applicationId)
      .subscribe((application: Application) => {
        this.iotDevices = application.iotDevices.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));
      });

    this.subscriptions.push(deviceSubscription);
  }

  getLastPackage(event: MatSelectChange) {
    this.iotDeviceId = event.value;
    const deviceSub = this.deviceService.getIoTDevice(event.value).subscribe((device: IotDevice) => {
      if (device.latestReceivedMessage) {
        this.payloadData = JSON.stringify(device.latestReceivedMessage.rawData, null, 2);
      }
    });

    const connectionSub = this.payloadDeviceDataTargetService.getByDataTarget(this.dataTargetId).subscribe(c => {
      const connection = c.data.find(x => x.iotDevices.some(d => d.id === event.value));
      this.payloadDecoderId = connection.payloadDecoder.id;
    });

    this.subscriptions.push(deviceSub, connectionSub);
  }

  pingDataTarget(dataPackage?: string) {
    this.loading = true;
    this.dataTargetService
      .testDataTarget({
        dataTargetId: this.dataTargetId,
        iotDeviceId: this.iotDeviceId,
        payloadDecoderId: this.payloadDecoderId,
        dataPackage: dataPackage,
      })
      .subscribe(
        response => {
          this.testResponse = response?.result
            ? JSON.stringify(response.result, null, 2)
            : this.dataTarget.type === DataTargetType.MQTT
            ? this.translate.instant("DATATARGET.SEE-RESULT-IN-LOG")
            : "";
          this.decodedData = response?.decodedPayload ? JSON.stringify(response.decodedPayload, null, 2) : "";
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.decodedData = JSON.stringify(error.error, null, 2);
          this.testResponse = "";
        }
      );
  }

  private getDatatarget() {
    const dataTargetSubscription = this.dataTargetService.get(this.dataTargetId).subscribe((datatarget: Datatarget) => {
      this.dataTarget = datatarget;
    });

    this.subscriptions.push(dataTargetSubscription);
  }

  private getPayloadDecoders() {
    const sub = this.payloadDecoderService.getMinimal().subscribe(result => {
      this.payloadDecoders = result.data;
    });

    this.subscriptions.push(sub);
  }
}
