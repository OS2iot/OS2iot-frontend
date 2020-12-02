import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {
  defaultTitle: 'Slet'
  constructor(
    private dialog: MatDialog
  ) { }

  showSimpleDialog(message?: string, showAccept = true, showCancel = true, showOk = false, infoTitle = ''): Observable<any> {
    return new Observable(
      (observer) => {
        const dialog = this.dialog.open(DeleteDialogComponent, {
          data: {
            infoTitle,
            showOk,
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
