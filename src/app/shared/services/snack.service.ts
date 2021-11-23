import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}

  public showSavedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.SAVE'), 'Luk', {
      duration: 10000,
    });
  }
  public showDeletedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.DELETE'), 'Luk', {
      duration: 10000,
    });
  }
  public showUpdatedSnack() {
    this.snackBar.open(this.translate.instant('SNACK.UPDATE'), 'Luk', {
      duration: 10000,
    });
  }
  public showFailSnack() {
    this.snackBar.open(this.translate.instant('SNACK.FAIL'), 'Luk', {
      duration: 10000,
    });
  }
  public showLoadFailSnack() {
    this.snackBar.open(this.translate.instant('SNACK.LOADFAIL'), 'Luk', {
      duration: 10000,
    });
  }
}
