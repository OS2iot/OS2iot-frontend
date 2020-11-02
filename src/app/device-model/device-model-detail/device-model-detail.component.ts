import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { DeviceModelService } from '../device-model.service';
import { DeviceModel } from '../device.model';

@Component({
  selector: 'app-device-model-detail',
  templateUrl: './device-model-detail.component.html',
  styleUrls: ['./device-model-detail.component.scss']
})
export class DeviceModelDetailComponent implements OnInit {

  deviceModel: DeviceModel;
  public backButton: BackButton = { label: '', routerLink: '/devicemodel' };
  public title: string;
  private deviceModelId: number;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private deviceModelService: DeviceModelService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate.get(['DEVICE-MODEL.DETAIL-TITLE', 'DEVICE-MODEL.DEVICE-MODEL'])
      .subscribe(translations => {
        this.backButton.label = translations['DEVICE-MODEL.DEVICE-MODEL'];
        this.title = translations['DEVICE-MODEL.DETAIL-TITLE'];
      });
    this.deviceModelId = +this.route.snapshot.paramMap.get('deviceId');
    if (this.deviceModelId) {
      this.getDeviceModel(this.deviceModelId);
    }
  }

  private getDeviceModel(id: number) {
    this.deviceModelService.get(id)
      .subscribe( (response) => {
        this.deviceModel = response.data;
      });
  }

}
