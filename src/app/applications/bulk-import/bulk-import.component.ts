import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ErrorMessageHandler } from '@shared/error-message-handler';
import { BackButton } from '@shared/models/back-button.model';
import { Papa } from 'ngx-papaparse';
import { BulkImport } from './bulk-import.model';
import { BulkMapping } from './bulkMapping';


@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'importStatus', 'errorMessages'];
  isLoading = false;
  bulkImport: BulkImport[];
  bulkImportResult: BulkImport[];
  fileFormatErrorMessage = false;
  files: any = [];
  faTrash = faTrash;
  faDownload = faDownload;
  private bulkMapper = new BulkMapping();
  public backButton: BackButton = { label: '', routerLink: '/applications' };
  private applicationId;
  private errorHandler = new ErrorMessageHandler();

  constructor(
    private papa: Papa,
    private iotDeviceService: IoTDeviceService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.translate.get(['NAV.APPLICATIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.APPLICATIONS'];
      });
    this.applicationId = +this.route.snapshot.paramMap.get('id');
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
    for (let index = 0; index < evt.length; index++) {
      const element = evt[index];
      this.files.push(element.name);
    }
    // handle csv data
    this.isLoading = true;
    const files = evt;  // File List object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        complete: results => {
          this.mapData(results.data);
          // this step ensures material can read from the array - should be fixed.
          this.bulkImportResult = this.bulkImport;
          if (this.bulkImport?.length === 0) {
            alert('no data in csv');
          } else {
            this.addIoTDevice();
          }
        }
      }
      );
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
    data.forEach( (device) => {
      const mappedDevice = this.bulkMapper.dataMapper(device, this.applicationId);
      this.bulkImport.push(new BulkImport(mappedDevice));
    });
  }

  addIoTDevice() {
    this.bulkImportResult.forEach((requestItem) => {
      if (requestItem.device.id) {
        this.iotDeviceService.createIoTDevice(requestItem.device).subscribe(
          (response) => {
            console.log(response);
            requestItem.importStatus = 'success';
          },
          (error: HttpErrorResponse) => {
            requestItem.errorMessages = this.errorHandler.handleError(error);
            requestItem.importStatus = 'Failed';
          }
        );
      } else {
        this.iotDeviceService.createIoTDevice(requestItem.device).subscribe(
          (res: any) => {
            console.log(res);
            requestItem.importStatus = 'success';
          },
          (error) => {
            requestItem.errorMessages = this.errorHandler.handleError(error);
            requestItem.importStatus = 'Failed';
          }
        );
      }
    });
  }
}
