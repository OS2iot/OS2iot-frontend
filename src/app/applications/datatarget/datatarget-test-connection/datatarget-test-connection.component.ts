import { Component, OnDestroy, OnInit } from "@angular/core";
import { IoTDeviceService } from "@applications/iot-devices/iot-device.service";
import { ApplicationService } from "@applications/application.service";
import { Application } from "@applications/application.model";
import { IotDevice } from "@applications/iot-devices/iot-device.model";
import { ActivatedRoute } from "@angular/router";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-datatarget-test-connection",
  templateUrl: "./datatarget-test-connection.component.html",
  styleUrl: "./datatarget-test-connection.component.scss",
})
export class DatatargetTestConnectionComponent implements OnInit, OnDestroy {
  codeOutput = "";
  editorJsonOutpuOptions = {
    theme: "vs",
    language: "json",
    autoIndent: true,
    roundedSelection: true,
    minimap: { enabled: false },
    readOnly: true,
  };
  public iotDevices: IotDevice[];
  public payloadData = "";

  private applicationId: number;
  private subscriptions = [];

  constructor(
    private deviceService: IoTDeviceService,
    private route: ActivatedRoute,
    public applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.applicationId = +this.route.parent.snapshot.paramMap.get("id");
    this.getDevices();
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
    const sub = this.deviceService.getIoTDevice(event.value).subscribe((device: IotDevice) => {
      if (device.latestReceivedMessage) {
        this.payloadData = JSON.stringify(device.latestReceivedMessage.rawData, null, 2);
      }
    });

    this.subscriptions.push(sub);
  }
}
