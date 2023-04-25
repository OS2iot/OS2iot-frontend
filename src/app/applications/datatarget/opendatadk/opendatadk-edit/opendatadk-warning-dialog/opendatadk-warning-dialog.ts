import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-opendatadk-warning-dialog',
  templateUrl: './opendatadk-warning-dialog.html',
  styleUrls: ['./opendatadk-warning-dialog.scss'],
})
export class OpenDataDkWarningDialogComponent {
  neverAgain: boolean = false;

  constructor(public dialog: MatDialogRef<OpenDataDkWarningDialogComponent>) {}

  ok() {
    this.dialog.close({ neverAgain: this.neverAgain });
  }
}
