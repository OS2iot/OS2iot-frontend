import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@shared/models/sort.model';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sub-bar',
  templateUrl: './sub-bar.component.html',
  styleUrls: ['./sub-bar.component.scss']
})
export class SubBarComponent implements OnInit {
  @Input() title: string;
  @Input() ctaLabelPrimary: string;
  @Input() ctaRouterLinkPrimary: string;
  @Input() ctaLabelSecondary: string;
  @Input() ctaRouterLinkSecondary: string;
  @Input() component: false;
  @Input() backButtonTitle: string;

  constructor(
    public translate: TranslateService,
    private location: Location) {
    translate.use('da');
  }

  ngOnInit(): void { }

  routeBack(): void {
    this.location.back();
  }

}
