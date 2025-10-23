import { Component, Input, OnInit } from "@angular/core";
import { LatestReceivedMessage } from "@applications/iot-devices/latestReceivedMessage.model";

@Component({
    selector: "app-data-package",
    templateUrl: "./data-package.component.html",
    styleUrls: ["./data-package.component.scss"],
    standalone: false
})
export class DataPackageComponent implements OnInit {
  @Input() latestReceivedMessage: LatestReceivedMessage;

  constructor() {}

  ngOnInit(): void {}
}
