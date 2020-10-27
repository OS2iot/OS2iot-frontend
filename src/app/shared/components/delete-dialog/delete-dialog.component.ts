import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public dialog: MatDialogRef<DeleteDialogComponent>) {
      this.translate.use('da');
   }

  ngOnInit(): void {
  }

  close() {
    this.dialog.close();
  }
}
