import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.scss'],
})
export class ApplicationsTableComponent implements OnInit {
  @Input() applications: Application[];
  @Input() pageTotal: number;
  @Input() pageOffset: number;
  @Output() prevPage = new EventEmitter();
  @Output() nextPage = new EventEmitter();
  @Output() deleteApplication = new EventEmitter();

  constructor(public translate: TranslateService) {
    translate.use('da');
  }

  ngOnInit() {}

  doDeleteApplication(id: number) {
    this.deleteApplication.emit(id);
  }

  gotoPrevPage() {
    this.prevPage.emit();
  }

  gotoNextPage() {
    console.log("got next inner")
    this.nextPage.emit();
  }
}
