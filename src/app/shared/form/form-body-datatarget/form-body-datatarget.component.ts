import { Component, OnInit, Input } from '@angular/core';
import { Datatarget, DatatargetData } from 'src/app/models/datatarget';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DatatargetService } from '../../services/datatarget.service';
import { Location } from '@angular/common';
import { DatatargetResponse } from 'src/app/models/datatarget-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from '@shared/services/application.service';
import { Application } from '@app/models/application';
import { IotDevice } from '@my-applications/iot-devices/iot-device.model';
import { PayloadDecoderService } from '@shared/services/payload-decoder.service';
import { PayloadDecoder, PayloadDecoderResponse } from '@app/payload-decoder/payload-decoder.model';
import { PayloadDeviceData } from '@app/models/payload-device-data';

@Component({
  selector: 'app-form-body-datatarget',
  templateUrl: './form-body-datatarget.component.html',
  styleUrls: ['./form-body-datatarget.component.scss']
})
export class FormBodyDatatargetComponent implements OnInit {

  @Input() submitButton: string;
  public datatarget: Datatarget = new Datatarget();
  public payLoad = '';
  public datatargetSubscription: Subscription;
  public applicationSubscription: Subscription;
  public payloadDecoderSubscription: Subscription;
  public errorMessages: any;
  public errorFields: string[];
  public formFailedSubmit = false;
  public datatargetid: number;
  private applicationId: number;
  public application: Application;
  public devices: IotDevice[];
  public payloadDecoders = [];

  deviceFormControl = new FormControl();
  payloadDecoderFormControl = new FormControl();

  payloadDeviceData: PayloadDeviceData[];
  newDynamic: any = {};

  constructor(
    private route: ActivatedRoute,
    public translate: TranslateService,
    private datatargetService: DatatargetService,
    private location: Location,
    private applicationService: ApplicationService,
    private payloadDecoderService: PayloadDecoderService
  ) { }

  ngOnInit(): void {
    this.translate.use('da');
    this.datatargetid = +this.route.snapshot.paramMap.get('datatargetId');
    this.applicationId = +this.route.snapshot.paramMap.get('id');
    if (this.datatargetid !== 0) {
      this.getDatatarget(this.datatargetid);
    }
    if (this.applicationId !== 0) {
      this.getDevices();
    }
    this.getPayloadDecoders();
  }

  addRow() {
    if (!this.payloadDeviceData) {
      this.payloadDeviceData = [];
    }
    this.payloadDeviceData.push({devices: [], payloadDecoderId: null, datatargetId: this.datatargetid});
  }

  deleteRow(index) {
      if (this.payloadDeviceData.length === 0) {
      } else {
          this.payloadDeviceData.splice(index, 1);
      }
  }

  onSubmit(): void {
    if (this.datatargetid) {
      this.updateDatatarget();
    } else {
      this.createDatatarget();
    }
  }

  updateDatatarget() {
    this.datatargetService.update(this.datatarget)
      .subscribe(
        (datatargetResponse: DatatargetResponse) => {
          this.datatarget = this.mapToDatatarget(datatargetResponse);
          this.routeBack();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        }
      );
  }

  createDatatarget() {
    this.datatarget.applicationId = this.applicationId;
    this.datatargetService.create(this.datatarget)
      .subscribe((response) => {
        this.datatargetid = response.id;
        this.datatarget.id = response.id;
      },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.formFailedSubmit = true;
        });

  }

  getDevices(): void {
    this.applicationSubscription = this.applicationService.getApplication(this.applicationId)
        .subscribe((application: Application) => {
            this.devices = application.iotDevices;
        });
  }

  getPayloadDecoders() {
    this.payloadDecoderSubscription = this.payloadDecoderService.getMultiple()
      .subscribe((response: PayloadDecoderResponse) => {
        this.payloadDecoders = response.data;
      });
  }

  handleError(error: HttpErrorResponse) {
    this.errorFields = [];
    this.errorMessages = [];
    error.error.message.forEach((err) => {
      this.errorFields.push(err.property);
      this.errorMessages = this.errorMessages.concat(
        Object.values(err.constraints)
      );
    });
  }

  routeBack(): void {
    this.location.back();
  }

  onCoordinateKey(event: any) {
    console.log(event.target.value);
    console.log(event.target.maxLength);
    if (event.target.value.length > event.target.maxLength) {
      event.target.value = event.target.value.slice(
        0,
        event.target.maxLength
      );
    }
  }

  getDatatarget(id: number) {
    this.datatargetSubscription = this.datatargetService
      .get(id)
      .subscribe((datatargetResponse: DatatargetResponse) => {
        this.datatarget = this.mapToDatatarget(datatargetResponse);
      });
  }

  private mapToDatatarget(data: DatatargetResponse): Datatarget {
    const dt: Datatarget = {
      id: data.id,
      name: data.name,
      timeout: data.timeout,
      type: data.type,
      url: data.url,
      authorizationHeader: null,
      applicationId: data.application.id
    };
    return dt;
  }

}
