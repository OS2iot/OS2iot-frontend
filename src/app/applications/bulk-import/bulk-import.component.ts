import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  IotDevicesImportResponse,
  IotDeviceImportRequest,
} from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageService } from '@shared/error-message.service';
import { splitList } from '@shared/helpers/array.helper';
import { Download } from '@shared/helpers/download.helper';
import { BulkImportService } from '@shared/services/bulk-import.service';
import { DownloadService } from '@shared/services/download.service';
import { Papa } from 'ngx-papaparse';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { BulkImport } from './bulk-import.model';
import { BulkMapping } from './bulkMapping';

let timeoutId: any = null;

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

  constructor(
    private papa: Papa,
    private iotDeviceService: IoTDeviceService,
    private route: ActivatedRoute,
    private titleService: Title,
    private translate: TranslateService,
    private downloads: DownloadService,
    private errorMessageService: ErrorMessageService,
    private bulkImportService: BulkImportService
  ) {
    this.translate.use('da');
  }

  ngOnInit(): void {
    this.translate.get(['TITLE.BULKIMPORT']).subscribe((translations) => {
      this.titleService.setTitle(translations['TITLE.BULKIMPORT']);
    });
    this.applicationId = +this.route.snapshot.paramMap.get('id');
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
    const times: { label: string; duration: number }[] = [];

    // Subscribe to subject in service, Emit the index of next item in the array to be previous
    // The emit will activate the subscription which should call the updateIoTDevice

    const { newDevices, updatedDevices } = this.splitDevices();

    // Reset the index of the next list to process
    this.bulkImportService.nextIotDeviceListIndex$.next(0);
    this.bulkImportService.nextIotDeviceListIndex$
      .pipe(takeWhile((value) => value in newDevices))
      .subscribe(
        (nextIndex) => {
          console.log("next index is ", nextIndex);
          const timeNow = performance.now();

          const requestItems = newDevices[nextIndex];
          // TODO: Only subscribe to devices if there's actually data to send
          const devices: IotDeviceImportRequest = {
            data: requestItems.map((bulkResult) => bulkResult.device),
          };
          this.iotDeviceService.createIoTDevices(devices).subscribe(
            (response) => {
              times.push({
                label: `${nextIndex} - Success`,
                duration: performance.now() - timeNow,
              });
              this.onSuccessfulImport(response, requestItems);
              // TODO: Update nextIoTDeviceIndex?
              this.bulkImportService.nextIotDeviceListIndex$.next(nextIndex + 1);
            },
            (error: HttpErrorResponse) => {
              times.push({
                label: `${requestItems[0].device.name} - Failed`,
                duration: performance.now() - timeNow,
              });
              requestItems.forEach((item) => {
                item.errorMessages = this.errorMessageService.handleErrorMessageWithFields(
                  error
                ).errorMessages;
                item.importStatus = 'Failed';
              });
            }
          );
        },
        (error: HttpErrorResponse) => {}
      );

    // for (const requestItem of this.bulkImportResult) {
    //   if (requestItem.device?.id) {
    //     // TODO: This doesn't work. Subscribe returns immediately. Then again, a request is made for every item at the same time..
    //     const timeNow = performance.now();
    //     this.iotDeviceService
    //       .updateIoTDevice(requestItem.device, requestItem.device.id)
    //       .subscribe(
    //         (response) => {
    //           times.push({
    //             label: `${requestItem.device.name} - Success`,
    //             duration: performance.now() - timeNow,
    //           });
    //           // console.log(response);
    //           requestItem.importStatus = 'success';
    //         },
    //         (error: HttpErrorResponse) => {
    //           times.push({
    //             label: `${requestItem.device.name} - Failed`,
    //             duration: performance.now() - timeNow,
    //           });
    //           requestItem.errorMessages = this.errorMessageService.handleErrorMessageWithFields(
    //             error
    //           ).errorMessages;
    //           requestItem.importStatus = 'Failed';
    //         }
    //       );
    //   } else if (requestItem.device) {
    //     const timeNow = performance.now();
    //     this.iotDeviceService.createIoTDevice(requestItem.device).subscribe(
    //       (res: any) => {
    //         // console.log(res);
    //         times.push({
    //           label: `${requestItem.device.name} - Success`,
    //           duration: performance.now() - timeNow,
    //         });
    //         requestItem.importStatus = 'success';
    //       },
    //       (error) => {
    //         times.push({
    //           label: `${requestItem.device.name} - Failed`,
    //           duration: performance.now() - timeNow,
    //         });
    //         requestItem.errorMessages = this.errorMessageService.handleErrorMessage(
    //           error
    //         );
    //         requestItem.importStatus = 'Failed';
    //       }
    //     );
    //   }
    // }

    timeoutId = setInterval(() => {
      if (times.length < this.bulkImportResult.length / 30) {
        console.log('Timer still going...');
        return;
      }
      clearInterval(timeoutId);
      console.log(
        'times',
        times.sort((a, b) => b.duration - a.duration)
      );
    }, 10 * 1000);

    // TODO: Edge case - a device's status was not set. This indicates a flaw in the above logic. Set them to error

    // Clear the subject. Or should we? TODO:
    // this.bulkImportService.nextIotDeviceIndex$.next(0);
  }

  private onSuccessfulImport(
    response: IotDevicesImportResponse[],
    requestItems: BulkImport[]
  ) {
    response.forEach((responseItem) => {
      const match = requestItems.find(
        ({ device }) =>
          device.name === responseItem.data.name &&
          device.applicationId === responseItem.data.application?.id
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

  private splitDevices() {
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
