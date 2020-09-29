import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.scss']
})
export class ApplicationEditComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/applications' };
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
    this.translate.get(['NAV.APPLICATIONS', 'FORM.EDIT-NEW-APPLICATION', 'APPLICATION.SAVE'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.APPLICATIONS'];
        this.title = translations['FORM.EDIT-NEW-APPLICATION'];
        this.submitButton = translations['APPLICATION.SAVE'];
      });
  }
}
