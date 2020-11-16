import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class SaveSnackService {
  constructor(
    private snackBar: MatSnackBar) { }

  public showSavedSnack() {
    this.snackBar.open('Gemt Succesfuldt', 'Luk', {
      duration: 10000,
    });
  }

}