import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from '@shared/shared-variable/shared-variable.service';

@Component({
  selector: 'app-device-model-list',
  templateUrl: './device-model-list.component.html',
  styleUrls: ['./device-model-list.component.scss']
})
export class DeviceModelListComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private titleService: Title
  ) {
    translate.use('da');
   }

  ngOnInit(): void {
    this.translate.get(['TITLE.DEVICEMODEL'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.DEVICEMODEL']);
      });
  }

}
