import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackBarComponent } from '@shared/components/snack-bar/snack-bar.component';


@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}

  public showSavedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.SAVE'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }
  public showDeletedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.DELETE'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }
  public showUpdatedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.UPDATE'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }
  public showFailSnack() {
    this.snackBar.open(this.translate.instant('SNACK.FAIL'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }
  public showLoadFailSnack() {
    this.snackBar.open(this.translate.instant('SNACK.LOADFAIL'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }
  public showInQueueSnack() {
    this.snackBar.open(this.translate.instant('SNACK.QUEUE'), this.translate.instant('SNACK.CLOSE'), {
      duration: 10000,
    });
  }

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
