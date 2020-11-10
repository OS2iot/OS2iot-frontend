import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter } from 'protractor';
import { DownlinkComponent } from '../downlink.component';

@Component({
  selector: 'app-downlink-dialog',
  templateUrl: './downlink-dialog.component.html',
  styleUrls: ['./downlink-dialog.component.scss']
})
export class DownlinkDialogComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public dialog: MatDialogRef<DownlinkComponent>) {}

  ngOnInit(): void {
    this.translate.use('da');
  }

  cancel() {
    this.dialog.close();
  }

}
