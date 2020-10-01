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
  @Input() sort: Sort[];
  @Input() pageLimit: number;
  @Input() selectedSortId: number;
  @Input() component: false;
  @Input() backButtonTitle: string;
  @Output() selectedSortChange = new EventEmitter();
  @Output() updatePageLimit = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private location: Location) {
    translate.use('da');
  }

  ngOnInit(): void { }

  changeSort(id: number) {
    this.selectedSortChange.emit(id);
  }

  routeBack(): void {
    this.location.back()
  }

}
