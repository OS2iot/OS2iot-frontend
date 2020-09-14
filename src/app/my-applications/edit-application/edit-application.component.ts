import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from 'src/app/models/back-button';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/my-applications' };
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
    this.translate.get(['NAV.MY-APPLICATIONS', 'FORM.EDIT-NEW-APPLICATION', 'APPLICATION.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.MY-APPLICATIONS'];
        this.title = translations['FORM.EDIT-NEW-APPLICATION'];
        this.submitButton = translations['APPLICATION.SAVE'];
      });
  }
}
