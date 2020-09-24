import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';

@Component({
  selector: 'app-create-lora-gateway',
  templateUrl: './create-lora-gateway.component.html',
  styleUrls: ['./create-lora-gateway.component.scss']
})
export class CreateLoraGatewayComponent implements OnInit {

  public backButton: BackButton = { label: '', routerLink: '/lora-gateways' };
  public multiPage: boolean = false;
  public title: string = '';
  public sectionTitle: string = '';
  public submitButton: string = '';

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['NAV.MY-LORA-GATEWAYS', 'FORM.CREATE-NEW-LORA-GATEWAY', 'LORA-GATEWAY.CREATE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.MY-LORA-GATEWAYS']
        this.title = translations['FORM.CREATE-NEW-LORA-GATEWAY']
        this.submitButton = translations['LORA-GATEWAY.CREATE']
      });
  }

}
