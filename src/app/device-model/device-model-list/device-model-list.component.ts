import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-device-model-list',
  templateUrl: './device-model-list.component.html',
  styleUrls: ['./device-model-list.component.scss']
})
export class DeviceModelListComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
