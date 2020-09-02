import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Application } from 'src/app/models/application';
import { IotDevice } from 'src/app/models/iot-device';
import { QuickActionButton } from 'src/app/models/quick-action-button';
import { BackButton } from 'src/app/models/back-button';
import { Datatarget } from 'src/app/models/datatarget';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-bar-single',
  templateUrl: './top-bar-single.component.html',
  styleUrls: ['./top-bar-single.component.scss']
})
export class TopBarSingleComponent implements OnInit, OnChanges {
  @Input() data: Application | IotDevice | Datatarget;
  @Input() buttons?: QuickActionButton[];
  @Input() backButton: BackButton;
  public title: string;

  // @Output() selectedSortChange = new EventEmitter();
  // @Output() updatePageLimit = new EventEmitter();

  constructor(
    public translate: TranslateService, 
    private location: Location) {
      translate.use('da');
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.data) {
      this.title = this.data.name;
    }
  }

  changeSort(id: number) {
      // this.selectedSortChange.emit(id);
  }

  routeBack(): void {
    this.location.back()
  }
}
