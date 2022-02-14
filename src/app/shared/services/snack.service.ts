import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root',
})
export class SnackService {

  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(title: string, displayMessage: string, buttonText: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        title: title,
        message: displayMessage,
        buttonText: buttonText
      },
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snackBar'
    });
  }
}
