import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Datatarget } from '../datatarget.model';
import { BackButton } from '@shared/models/back-button.model';

@Component({
  selector: 'app-datatarget-edit',
  templateUrl: './datatarget-edit.component.html',
  styleUrls: ['./datatarget-edit.component.scss']
})
export class DatatargetEditComponent implements OnInit {
  public multiPage = false;
  public title = '';
  public sectionTitle = '';
  public submitButton = '';
  public datatarget: Datatarget;
  public backButtonTitle = '';

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute
  ) {
    translate.use('da');
  }

  ngOnInit() {
    this.translate
      .get([
        'FORM.CREATE-NEW-DATATARGET',
        'FORM.EDIT-DATATARGET',
        'DATATARGET.SAVE',
        'NAV.DATATARGET',
      ])
      .subscribe((translations) => {
        const datatargetid = +this.route.snapshot.paramMap.get('datatargetId');
        if (datatargetid !== 0) {
          this.title = translations['FORM.EDIT-DATATARGET'];
        } else {
          this.title = translations['FORM.CREATE-NEW-DATATARGET'];
        }
        this.submitButton = translations['DATATARGET.SAVE'];
        this.backButtonTitle = translations['NAV.DATATARGET'];
      });
  }
}
