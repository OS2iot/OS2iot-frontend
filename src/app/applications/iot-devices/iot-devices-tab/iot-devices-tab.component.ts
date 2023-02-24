import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@applications/application.service';

@Component({
  selector: 'app-iot-devices-tab',
  templateUrl: './iot-devices-tab.component.html',
  styleUrls: ['./iot-devices-tab.component.scss'],
})
export class IotDevicesTabComponent implements OnInit {
  constructor(public applicationService: ApplicationService) {}

  ngOnInit(): void {}
}
