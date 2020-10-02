import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
  iotDevices: IotDevice[];
  files: any = [];
  faTrash = faTrash;
  faDownload = faDownload;
  private bulkMapper = new BulkMapping();
  public backButton: BackButton = { label: '', routerLink: '/applications' };
  private applicationId;

  constructor(
    private papa: Papa,
    private iotDeviceService: IoTDeviceService,
    private router: Router,
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
    // handle file
    this.bulkImport = [];
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
          this.iotDevices = this.bulkImport.map( (item) => item.device);
          if (this.bulkImport?.length === 0) {
            alert('no data in csv');
          } else {
            this.addIoTDevice();
          }
        }
      }
      );
      console.log(this.bulkImport);
      this.isLoading = false;
    };
  }

  private mapData(data: any[]) {
    data.forEach( (device) => {
      const mappedDevice = this.bulkMapper.dataMapper(device, this.applicationId);
      this.bulkImport.push(new BulkImport(mappedDevice));
    });
  }

  addIoTDevice() {
    this.iotDevices.forEach((iotDevice) => {
      if (iotDevice.id) {
        this.iotDeviceService.createIoTDevice(iotDevice).subscribe(
          (response) => {
            console.log(response);
            iotDevice.importStatus = 'success';
          },
          (error: HttpErrorResponse) => {
            iotDevice.errorMessages = this.handleError(error);
            iotDevice.importStatus = 'Failed';
          }
        );
      } else {
        this.iotDeviceService.createIoTDevice(iotDevice).subscribe(
          (res: any) => {
            console.log(res);
            iotDevice.importStatus = 'success';
          },
          (error) => {
            iotDevice.errorMessages = this.handleError(error);
            iotDevice.importStatus = 'Failed';
          }
        );
      }
    });
  }

  handleError(error: HttpErrorResponse): string[] {
    let errorMessages = [];
    if (typeof error.error.message === 'string') {
      errorMessages.push(error.error.message);
    } else {
      error.error.message.forEach( (err) => {
        if (err.property === 'lorawanSettings') {
          err.children.forEach( (element) => {
            errorMessages = errorMessages.concat(
              Object.values(element.constraints)
            );
          });
        } else {
          errorMessages.push(
            Object.values(err.constraints)
          );
        }
      });
    }
    return errorMessages;
  }
}
