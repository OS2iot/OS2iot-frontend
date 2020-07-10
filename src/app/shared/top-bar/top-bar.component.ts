import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input() title: string;
  @Input() ctaLabel: string;
  @Input() ctaRouterLink: string;
  @Input() sort: any;

  constructor(
    public translate: TranslateService
) {
    translate.use('da');
}

  ngOnInit(): void {

  }

}
