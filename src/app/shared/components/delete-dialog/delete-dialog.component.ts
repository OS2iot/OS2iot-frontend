import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '../../models/dialog.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public dialog: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: DialogModel) {
      this.translate.use('da');
   }

  ngOnInit(): void {
  }

  close() {
    this.dialog.close();
  }
}
