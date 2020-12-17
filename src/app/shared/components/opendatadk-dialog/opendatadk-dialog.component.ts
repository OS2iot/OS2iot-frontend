import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-opendatadk-dialog',
  templateUrl: './opendatadk-dialog.component.html',
  styleUrls: ['./opendatadk-dialog.component.scss']
})
export class OpendatadkDialogComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public dialog: MatDialogRef<OpendatadkDialogComponent>) {
      this.translate.use('da');
   }

  ngOnInit(): void {
  }

  close() {
    this.dialog.close();
  }

}
