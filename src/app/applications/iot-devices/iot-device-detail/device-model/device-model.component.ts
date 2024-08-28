import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { DeviceModelService } from "@app/device-model/device-model.service";
import { IotDevice } from "@applications/iot-devices/iot-device.model";

@Component({
  selector: "app-device-model",
  templateUrl: "./device-model.component.html",
  styleUrls: ["./device-model.component.scss"],
})
export class DeviceModelComponent implements OnInit, OnChanges {
  @Input() device: IotDevice;
  public deviceModel: string;
  editorJsonOutpuOptions = {
    theme: "vs",
    language: "json",
    autoIndent: true,
    roundedSelection: true,
    minimap: { enabled: false },
    readOnly: true,
  };

  constructor(private deviceModelService: DeviceModelService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.device.deviceModelId) {
      this.getDeviceModel(this.device.deviceModelId);
    }
  }

  getDeviceModel(id: number) {
    this.deviceModelService.get(id).subscribe(response => {
      this.deviceModel = JSON.stringify(response.body, null, 4);
    });
  }
}
