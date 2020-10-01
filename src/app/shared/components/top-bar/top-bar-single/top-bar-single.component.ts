import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Application } from '@applications/application.model';
import { Datatarget } from '@applications/datatarget/datatarget.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { BackButton } from '@shared/models/back-button.model';
import { QuickActionButton } from '@shared/models/quick-action-button.model';

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
  @Input() staticTitle: string;

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
