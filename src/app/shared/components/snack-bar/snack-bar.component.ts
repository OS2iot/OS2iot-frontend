import { Component, Inject, OnInit } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.scss"],
  standalone: false,
})
export class SnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, public snackBarRef: MatSnackBarRef<SnackBarComponent>) {}

  ngOnInit(): void {}
}
