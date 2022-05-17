import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { Application } from '@applications/application.model';
import { DeviceType } from '@shared/enums/device-type';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {
  private deleteDialogSubscription: Subscription;
  constructor(
    private dialog: MatDialog,
    public translate: TranslateService,
  ) {}

  showSimpleDialog(
    message?: string,
    showAccept = true,
    showCancel = true,
    showOk = false,
    infoTitle = '',
    showReject?: boolean,
    acceptText?: string,
    cancelText?: string
  ): Observable<any> {
    return new Observable((observer) => {
      const dialog = this.dialog.open(DeleteDialogComponent, {
        data: {
          infoTitle,
          showOk,
          showAccept,
          showCancel,
          message: message ? message : this.translate.instant('DIALOG.DELETE.ARE-YOU-SURE'),
          showReject,
          acceptText,
          cancelText
        },
      });

      dialog.afterClosed().subscribe((result) => {
        observer.next(result);
      });
    });
  }

  showApplicationDialog(application: Application): Observable<any> {
      let message: string;
      let showAccept: boolean = true;
      const hasSigfoxDevices: boolean = this.applicationHasSigFoxDevices(
        application
      );

      if (hasSigfoxDevices) {
        message = this.translate.instant(
          'APPLICATION.DELETE-HAS-SIGFOX-DEVICES-PROMPT'
        );
        showAccept = false;
      } else if (this.applicationHasDevices(application)) {
        message = this.translate.instant(
          'APPLICATION.DELETE-HAS-DEVICES-PROMPT'
        );
      }
      return this.showSimpleDialog(message, showAccept);
  }

  applicationHasDevices(application: Application): boolean {
    return application.iotDevices?.length > 0;
  }

  applicationHasSigFoxDevices(application: Application): boolean {
    const sigfoxDevice = application.iotDevices.find((device) => {
      return device.type === DeviceType.SIGFOX;
    });
    return sigfoxDevice !== undefined;
  }
}
