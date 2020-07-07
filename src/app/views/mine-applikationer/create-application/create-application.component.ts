import { Component, OnInit } from '@angular/core';
import { BackButton } from 'src/app/models/back-button';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  public backButton: BackButton = {label: '', routerLink: '/mine-applikationer'};
  public multiPage: boolean = false;
  public title: string = '';
  public sectionTitle: string = '';

  constructor(public translate: TranslateService) {
    translate.use('da');
  }
  
  ngOnInit(): void {
    this.translate.get(['NAV.MY-APPLICATIONS', 'FORM.CREATE-NEW-APPLICATION'])
    .subscribe(translations => {
      this.backButton.label = translations['NAV.MY-APPLICATIONS'];
      this.title = translations['FORM.CREATE-NEW-APPLICATION'];
    });
  }

}
