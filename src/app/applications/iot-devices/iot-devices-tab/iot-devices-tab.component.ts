import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '@applications/application.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportCsvDialogComponent } from '@applications/iot-devices/iot-devices-tab/export-csv-dialog/export-csv-dialog.component';
import { RestService } from '@shared/services/rest.service';
import { Download, download } from '@shared/helpers/download.helper';
import { DownloadService } from '@shared/services/download.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-iot-devices-tab',
  templateUrl: './iot-devices-tab.component.html',
  styleUrls: ['./iot-devices-tab.component.scss'],
})
export class IotDevicesTabComponent implements OnInit {
  download$: Observable<Download>;
  private applicationId: number;

  constructor(
    public applicationService: ApplicationService,
    private dialog: MatDialog,
    private restService: RestService,
    private downloader: DownloadService
  ) {}
  ngOnInit(): void {
    this.applicationId = this.applicationService.id;
  }

  get openDialogFunc() {
    return this.openExportCsvDialog.bind(this);
  }

  public openExportCsvDialog() {
    const dialog = this.dialog.open(ExportCsvDialogComponent);

    dialog.afterClosed().subscribe(async (result) => {
      if (result) {
        // Start csv download
        this.download$ = this.downloader.download(
          environment.baseUrl +
            'iot-device/getDevicesMetadataCsv/' +
            this.applicationId,
          'iotDeviceMetadata.csv'
        );
      }
    });
  }
}
