import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Datatarget } from 'src/app/models/datatarget';
import { BackButton } from 'src/app/models/back-button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datatarget-edit',
  templateUrl: './datatarget-edit.component.html',
  styleUrls: ['./datatarget-edit.component.scss']
})
export class DatatargetEditComponent implements OnInit {

  public backButton: BackButton = {
    label: '',
    routerLink: '',
  };
  public multiPage: boolean = false;
  public title: string = '';
  public sectionTitle: string = '';
  public submitButton: string = '';
  public datatarget: Datatarget;

  constructor(
      public translate: TranslateService,
      private route: ActivatedRoute
  ) {
      translate.use('da');
  }

  ngOnInit() {
    this.translate
      .get(['FORM.CREATE-NEW-DATATARGET', 'DATATARGET.CREATE'])
      .subscribe((translations) => {
          this.title = translations['FORM.CREATE-NEW-DATATARGET'];
          this.submitButton = translations['DATATARGET.CREATE'];
      });
  }

}
