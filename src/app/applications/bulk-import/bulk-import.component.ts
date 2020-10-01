import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '@applications/application.model';
import { IotDevice } from '@applications/iot-devices/iot-device.model';
import { IoTDeviceService } from '@applications/iot-devices/iot-device.service';
import { TranslateService } from '@ngx-translate/core';
import { BackButton } from '@shared/models/back-button.model';
import { Papa } from 'ngx-papaparse';


@Component({
  selector: 'app-bulk-import',
  templateUrl: './bulk-import.component.html',
  styleUrls: ['./bulk-import.component.scss']
})
export class BulkImportComponent implements OnInit {
  public backButton: BackButton = { label: '', routerLink: '/applications' };
  displayedColumns: string[] = ['name', 'type', 'status'];
  isLoading = false;
  iotDevice: IotDevice[];
  public application: Application;

  public errorMessages: any;
  public errorFields: string[];
  public importStatus = false;

  constructor(
    private papa: Papa,
    private iotDeviceService: IoTDeviceService,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.get(['NAV.APPLICATIONS'])
      .subscribe(translations => {
        this.backButton.label = translations['NAV.APPLICATIONS'];
      });
  }

  handleDropedFile(evt) {
    this.isLoading = true;
    const files = evt.target.files;  // File List object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event: any) => {
      const csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: true,
        delimiter: ",",
        // dynamicTyping: true,
        // transformHeader: function (h) {
        //   return h.trim();
        // },
        complete: results => {

          const data = results.data;
          this.iotDevice = data;
          console.log('Parsed: ' + this.iotDevice)
          const total = this.iotDevice.length;
          if (total === 0) {
            this.isLoading = false;
            alert('no data in csv');
            return;
          }
          return this.iotDevice;
          //this.addIoTDevice();
        }
      }
      );
      console.log(this.iotDevice);

      this.isLoading = false;
    };
  }

  addIoTDevice() {
    this.iotDevice.forEach((relation) => {
      if (relation.id) {
        this.iotDeviceService.createIoTDevice(relation).subscribe(
          (response) => {
            console.log(response);
          },
          (error: HttpErrorResponse) => {
            this.handleError(error);
            this.importStatus = true;
          }
        );
      } else {
        this.iotDeviceService.createIoTDevice(relation).subscribe(
          (res: any) => {
            console.log(res);
          },
          (error) => {
            this.handleError(error);
          }
        )
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    if (typeof error.error.message === 'string') {
      this.errorMessages.push(error.error.message);
    } else {
      error.error.message.forEach((err) => {
        if (err.property === 'lorawanSettings') {
          err.children.forEach(element => {
            this.errorFields.push(element.property);
            this.errorMessages = this.errorMessages.concat(
              Object.values(element.constraints)
            );
          });
        } else {
          this.errorFields.push(err.property);
          this.errorMessages = this.errorMessages.concat(
            Object.values(err.constraints)
          );
        }
      });
    }

  }
}
