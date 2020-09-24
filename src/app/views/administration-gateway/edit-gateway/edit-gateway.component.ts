import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';

@Component({
  selector: 'app-edit-gateway',
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.scss']
})
export class EditGatewayComponent implements OnInit {

  public backButton: BackButton = { label: '', routerLink: '/lora-gateways' };
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public submitButton = '';

  constructor(
    public translate: TranslateService
  ) {
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['NAV.LORA-GATEWAYS', 'FORM.EDIT-NEW-GATEWAY', 'GATEWAY.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.LORA-GATEWAYS'];
        this.title = translations['FORM.EDIT-NEW-GATEWAY'];
        this.submitButton = translations['GATEWAY.SAVE'];
      });
  }

}
