import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {

  constructor(
    private dialog: MatDialog
  ) {}

  showSimpleDeleteDialog(message?: string, showAccept = true, showCancel = true): Observable<any> {
    return new Observable(
      (observer) => {
        const dialog = this.dialog.open(DeleteDialogComponent, {
          data: {
            showAccept,
            showCancel,
            message: message ? message : 'Er du sikker på at du vil slette?'
          }
        });

        dialog.afterClosed().subscribe((result) => {
          observer.next(result);
        });
      }
    );
  }

}
