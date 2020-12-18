import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private titleService: Title
  ) { 
    translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.LORAWAN-PROFILE'])
      .subscribe(translations => {
        this.titleService.setTitle(translations['TITLE.LORAWAN-PROFILE']);
      });
  }

}
