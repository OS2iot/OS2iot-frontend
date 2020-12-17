import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OpendatadkDialogComponent } from './opendatadk-dialog.component';
@Injectable({
  providedIn: 'root',
})
export class OpendatadkDialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  showDialog(): Observable<any> {
    return new Observable(
      (observer) => {
        const dialog = this.dialog.open(OpendatadkDialogComponent);

        dialog.afterClosed().subscribe((result) => {
          observer.next(result);
        });
      }
    );
  }

}
