import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  IotDeviceImportRequest,
  IotDevicesImportResponse,
} from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationAccessScope } from '@shared/enums/access-scopes';
import { ErrorMessageService } from '@shared/error-message.service';
import { splitList } from '@shared/helpers/array.helper';
import { Download } from '@shared/helpers/download.helper';
import { BulkImportService } from '@shared/services/bulk-import.service';
import { DownloadService } from '@shared/services/download.service';
import { MeService } from '@shared/services/me.service';
import { Papa } from 'ngx-papaparse';
import { Observable, Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BulkImport } from './bulk-import.model';
import { BulkMapping } from './bulkMapping';

@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss'],
})
export class BulkImportComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'importStatus',
    'errorMessages',
  ];
  isLoading = false;
  bulkImport: BulkImport[];
  bulkImportResult: BulkImport[];
  fileFormatErrorMessage = false;
  files: any = [];
  faTrash = faTrash;
  faDownload = faDownload;
  samples = [
    {
      name: 'generic-http-sample.csv',
      url: '../../../assets/docs/iotdevice_generichttp.csv',
    },
    {
      name: 'lorawan-otaa-sample.csv',
      url: '../../../assets/docs/iotdevice_lorawan_otaa.csv',
    },
    {
      name: 'lorawan-abp-sample.csv',
      url: '../../../assets/docs/iotdevice_lorawan_abp.csv',
    },
  ];
  download$: Observable<Download>;
  private bulkMapper = new BulkMapping();
  public backButtonTitle: string;
  private applicationId;
  canEdit: boolean;

  constructor(
    private papa: Papa,
    private iotDeviceService: IoTDeviceService,
    private route: ActivatedRoute,
    private titleService: Title,
    private translate: TranslateService,
    private downloads: DownloadService,
    private errorMessageService: ErrorMessageService,
    private meService: MeService,
    private bulkImportService: BulkImportService
  ) {
    this.translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.BULKIMPORT']).subscribe((translations) => {
      this.titleService.setTitle(translations['TITLE.BULKIMPORT']);
    });
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    this.canEdit = this.meService.hasAccessToTargetOrganization(
      OrganizationAccessScope.ApplicationWrite
    );
  }

  download({ name, url }: { name: string; url: string }) {
    this.download$ = this.downloads.download(url, name);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  handleDropedFile(evt: any) {
    this.fileFormatErrorMessage = false;
    if (!this.validateFile(evt[0].name)) {
      console.log('Selected file format is not supported');
      this.fileFormatErrorMessage = true;
      return false;
    }
    this.bulkImport = [];
    this.bulkImportResult = [];

    for (const element of evt) {
      this.files.push(element.name);
    }

    // handle csv data
    this.isLoading = true;
    const files = evt; // File List object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: (results) => {
          this.mapData(results.data);
          // this step ensures material can read from the array - should be fixed.
          this.bulkImportResult = this.bulkImport;
          if (this.bulkImport?.length === 0) {
            alert('no data in csv');
          } else {
            return this.bulkImport;
          }
        },
      });
      this.isLoading = false;
    };
  }

  private validateFile(name: string) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'csv') {
      return true;
    } else {
      return false;
    }
  }

  private mapData(data: any[]) {
    data.forEach((device) => {
      const mappedDevice = this.bulkMapper.dataMapper(
        device,
        this.applicationId
      );
      if (mappedDevice) {
        this.bulkImport.push(new BulkImport(mappedDevice));
      } else {
        this.translate.get(['ERROR.SEMANTIC']).subscribe((translations) => {
          this.bulkImport.push(
            new BulkImport(null, [translations['ERROR.SEMANTIC']])
          );
        });
      }
    });
  }

  addIoTDevice() {
    // Subscribe to subject in service, Emit the index of next item in the array to be previous
    // The emit will activate the subscription which should call the updateIoTDevice
    const { newDevices, updatedDevices } = this.splitDevices();

    this.postBulkImportPayload(
      newDevices,
      this.bulkImportService.nextCreateIotDeviceBatchIndex$,
      this.iotDeviceService.createIoTDevices.bind(this.iotDeviceService)
    );
    this.postBulkImportPayload(
      updatedDevices,
      this.bulkImportService.nextUpdateDeviceBatchIndex$,
      this.iotDeviceService.updateIoTDevices.bind(this.iotDeviceService)
    );
  }

  private postBulkImportPayload(
    bulkDevices: BulkImport[][],
    batchIndex$: Subject<void>,
    importDevices: (
      payload: IotDeviceImportRequest
    ) => Observable<IotDevicesImportResponse[]>
  ): void {
    if (!bulkDevices.length) {
      return;
    }

    let batchIndex = 0;

    // takeWhile() will unsubscribe once the condition is false
    batchIndex$.pipe(takeWhile(() => batchIndex in bulkDevices)).subscribe(
      () => {
        const requestItems = bulkDevices[batchIndex];
        const devices: IotDeviceImportRequest = {
          data: requestItems.map((bulkResult) => bulkResult.device),
        };
        importDevices(devices).subscribe(
          (response) => {
            this.onSuccessfulImport(response, requestItems);
            ++batchIndex;
            batchIndex$.next();
          },
          (error: HttpErrorResponse) => {
            requestItems.forEach((item) => {
              item.errorMessages = this.errorMessageService.handleErrorMessageWithFields(
                error
              ).errorMessages;
              item.importStatus = 'Failed';
            });
            // Continue processing the next batches
            ++batchIndex;
            batchIndex$.next();
          }
        );
      },
      (_error: HttpErrorResponse) => {
        // Should not happen
      },
      () => {
        // Process any devices whose status hasn't been set and mark them as errors.
        this.onCompleteImport(bulkDevices);
      }
    );

    // Trigger our listener
    batchIndex$.next();
  }

  private onSuccessfulImport(
    response: IotDevicesImportResponse[],
    requestItems: BulkImport[]
  ) {
    response.forEach((responseItem) => {
      const match = requestItems.find(
        ({ device }) =>
          device.name === responseItem.idMetadata.name &&
          device.applicationId === responseItem.idMetadata.applicationId
      );
      if (!match) {
        return;
      }

      if (responseItem.error && match) {
        match.errorMessages = this.errorMessageService.handleErrorMessageWithFields(
          { error: responseItem.error }
        ).errorMessages;
        match.importStatus = 'Failed';
      } else {
        match.errorMessages = [];
        match.importStatus = 'Success';
      }
    });
  }

  private onCompleteImport(devicesBulk: BulkImport[][]) {
    for (const bulk of devicesBulk) {
      for (const device of bulk) {
        if (!device.importStatus) {
          device.importStatus = 'Failed';
          device.errorMessages = this.errorMessageService.handleErrorMessageWithFields(
            {
              error: {
                message: 'MESSAGE.FAILED-TO-CREATE-OR-UPDATE-IOT-DEVICE',
              },
            }
          ).errorMessages;
        }
      }
    }
  }

  private splitDevices(): {
    newDevices: BulkImport[][];
    updatedDevices: BulkImport[][];
  } {
    if (!this.bulkImportResult) {
      return { newDevices: [], updatedDevices: [] };
    }

    const { updatedDevices, newDevices } = this.bulkImportResult.reduce(
      (
        res: {
          newDevices: BulkImport[];
          updatedDevices: BulkImport[];
        },
        curr
      ) => {
        if (curr.device.id) {
          res.updatedDevices.push(curr);
        } else if (curr.device) {
          res.newDevices.push(curr);
        }
        return res;
      },
      { updatedDevices: [], newDevices: [] }
    );
    return {
      newDevices: splitList(newDevices),
      updatedDevices: splitList(updatedDevices),
    };
  }
}
