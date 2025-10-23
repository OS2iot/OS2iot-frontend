import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogModel } from "@shared/models/dialog.model";

@Component({
    selector: "export-csv-dialog",
    templateUrl: "./export-csv-dialog.component.html",
    styleUrls: ["./export-csv-dialog.component.scss"],
    standalone: false
})
export class ExportCsvDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ExportCsvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogModel: DialogModel
  ) {}

  ngOnInit(): void {}
}
